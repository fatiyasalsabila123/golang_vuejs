package main

import (
	// Import beberapa package yang diperlukan
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/golang-jwt/jwt"
	"github.com/jinzhu/gorm"
)

// Definisikan struktur untuk respon yang akan dikirim ke klien
type Response struct {
	Success bool        `json:"success"`
	Result  interface{} `json:"result"`
}

// Middleware untuk logging permintaan dan respons
func RequestResponseLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Printf("Request: %s %s", c.Request.Method, c.Request.URL.String())

		c.Next()

		log.Printf("Response: %d %s", c.Writer.Status(), http.StatusText(c.Writer.Status()))
	}
}

func main() {
	// Inisialisasi Gin dengan middleware bawaan
	app := gin.Default()
	app.Use(gin.Recovery())
	app.Use(RequestResponseLogger())

	// Grup rute untuk endpoint-endpoint tertentu
	domain := app.Group("api")
	domain.POST("/payment", Payment)
	domain.POST("/generate/jwt", GenerateToken)
	domain.POST("/validate/jwt", ValidateToken)

	// Menjalankan server pada port 9000
	fmt.Println(app.Run(":9000"))
}

// Struktur untuk mengambil username dari permintaan pembuatan token
type TokenGenerate struct {
	Username string `json:"username" binding:"required"`
}

// Struktur untuk mengambil token dari permintaan validasi token
type TokenValidate struct {
	Token string `json:"token" binding:"required"`
}

// Handler untuk pembuatan token JWT
func GenerateToken(c *gin.Context) {
	var request TokenGenerate

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusOK, Response{
			Success: false,
			Result:  err.Error(),
		})
		return
	}

	// Menyiapkan kunci rahasia untuk penandatanganan token
	secretKey := []byte("secret-key")

	// Membuat token baru dengan metode penandatanganan HS256
	token := jwt.New(jwt.SigningMethodHS256)

	// Menetapkan klaim-klaim pada token, termasuk waktu kadaluarsa
	temp := time.Now().Add(20 * time.Second).Unix()
	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = request.Username
	claims["exp"] = temp // Waktu kadaluarsa token

	// Menandatangani token dengan kunci rahasia
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		c.JSON(http.StatusOK, Response{
			Success: false,
			Result:  "failed generate token",
		})
	}

	c.JSON(http.StatusOK, Response{
		Success: true,
		Result:  tokenString,
	})
}

// Handler untuk validasi token JWT
func ValidateToken(c *gin.Context) {
	var request TokenValidate

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusOK, Response{
			Success: false,
			Result:  err.Error(),
		})
		return
	}

	// Menetapkan kunci rahasia untuk validasi token
	token, err := jwt.Parse(request.Token, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret-key"), nil
	})

	// Menangani kesalahan pada validasi token
	if err != nil {
		c.JSON(http.StatusOK, Response{
			Success: false,
			Result:  err.Error(),
		})
		return
	}

	// Memeriksa keabsahan token dan waktu kadaluarsa
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		expTime := time.Unix(int64(claims["exp"].(float64)), 0)
		if time.Now().After(expTime) {
			c.JSON(http.StatusOK, Response{
				Success: false,
				Result:  "Token is expired",
			})
			return
		}

		c.JSON(http.StatusOK, Response{
			Success: true,
			Result:  "Token is valid",
		})
		log.Println("SUCESS VALIDATION")
		return
	}

	c.JSON(http.StatusOK, Response{
		Success: false,
		Result:  "Token is not valid",
	})
}

// Struktur untuk data produk
type Product struct {
	Index int `json:"index" binding:"required"`
	Qty   int `json:"qty" binding:"required"`
}

// Metode untuk menentukan nama tabel yang digunakan oleh GORM
func (p *Product) TableName() string {
	return "history"
}

// Handler untuk pemrosesan pembayaran
func Payment(c *gin.Context) {
	var request []Product
	token := c.GetHeader("Authorization")

	// Memeriksa token untuk autentikasi sederhana
	if token != "david" {
		c.JSON(http.StatusForbidden, Response{
			Success: false,
			Result:  "Bad Request, Please Try Again",
		})
		return
	}

	// Mengambil data produk dari permintaan JSON
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusOK, Response{
			Success: false,
			Result:  "Bad Request, Please Try Again",
		})
		return
	}

	// Konfigurasi sambungan database
	dsn := "root:@tcp(localhost:3306)/hicolleagues"

	// Membuka koneksi ke database MySQL menggunakan GORM
	db, err := gorm.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// Iterasi melalui data produk dan menyimpannya ke database
	for _, v := range request {
		err = db.Omit("umur").Create(&v).Error
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, "failed save data")
			return
		}
	}

	// Menampilkan data produk dalam format JSON di konsol server
	body, _ := json.Marshal(request)
	fmt.Println(string(body))

	// Menanggapi permintaan dengan status OK dan pesan sukses
	c.JSON(200, Response{
		Success: true,
	})
}

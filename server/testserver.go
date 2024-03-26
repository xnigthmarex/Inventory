package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthResponse struct {
	Token string `json:"token"`
}

func main() {
	r := gin.Default()

	r.POST("/register", func(c *gin.Context) {
		var credentials Credentials
		if err := c.ShouldBindJSON(&credentials); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
	})

	r.POST("/auth", func(c *gin.Context) {
		var credentials Credentials
		if err := c.ShouldBindJSON(&credentials); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
			return
		}

		token := "test123"

		c.JSON(http.StatusOK, AuthResponse{Token: token})
	})

	if err := r.Run(":8080"); err != nil {
		fmt.Println("Error starting server:", err)
	}
}

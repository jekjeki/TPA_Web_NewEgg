package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/controllers"
	"github.com/jekjeki/golang-gorm-postgres/initializers"
	"github.com/jekjeki/golang-gorm-postgres/routes"
)

var (
	server              *gin.Engine
	authController      controllers.AuthController
	authRouteController routes.AuthRouteController

	UserController      controllers.UserController
	UserRouteController routes.UserRouteController

	CategoryController      controllers.CategoryController
	CategoryRouteController routes.CategoryRouteController

	ProductController      controllers.ProductController
	ProductRouteController routes.ProductRouteController

	VoucherController      controllers.VoucherController
	VoucherRouteController routes.VoucherRouteController

	AdminController      controllers.AdminController
	AdminRouteController routes.AdminRouteController

	StoreController      controllers.StoreController
	StoreRouteController routes.StoreRouteController

	CartController      controllers.CartController
	CartRouteController routes.CartRouteController

	WishlistController      controllers.WishlistController
	WishlistRouteController routes.WishlistRouteController

	FeedbackController      controllers.FeedbackController
	FeedbackRouteController routes.FeedbackRouteController

	NotesController      controllers.NotesController
	NotesRouteController routes.NotesRouteController
)

func init() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("? Could not load environment variables", err)
	}

	initializers.ConnectDB(&config)

	authController = controllers.NewAuthController(initializers.DB)
	authRouteController = routes.NewAuthRouteController(authController)

	UserController = controllers.NewUserController(initializers.DB)
	UserRouteController = routes.NewRouteUserController(UserController)

	CategoryController = controllers.NewCategoryController(initializers.DB)
	CategoryRouteController = routes.NewRouteCategoryController(CategoryController)

	ProductController = controllers.NewProductController(initializers.DB)
	ProductRouteController = routes.NewRouteProductController(ProductController)

	VoucherController = controllers.NewVoucherController(initializers.DB)
	VoucherRouteController = routes.NewRouteVoucherController(VoucherController)

	AdminController = controllers.NewAdminController(initializers.DB)
	AdminRouteController = routes.NewAdminRouteController(AdminController)

	StoreController = controllers.NewStoreController(initializers.DB)
	StoreRouteController = routes.NewRouteStoreController(StoreController)

	CartController = controllers.NewCartController(initializers.DB)
	CartRouteController = routes.NewRouteCartController(CartController)

	WishlistController = controllers.NewWishlistController(initializers.DB)
	WishlistRouteController = routes.NewRouteWishlistController(WishlistController)

	FeedbackController = controllers.NewFeedbackController(initializers.DB)
	FeedbackRouteController = routes.NewRouteFeedbackController(FeedbackController)

	NotesController = controllers.NewNotesController(initializers.DB)
	NotesRouteController = routes.NewRouteNotesController(NotesController)

	server = gin.Default()
}

func main() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("? Could not load environment variables", err)
	}

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:8000", config.ClientOrigin}
	corsConfig.AllowCredentials = true

	server.Use(cors.New(corsConfig))

	router := server.Group("/api")
	router.GET("/healthchecker", func(ctx *gin.Context) {
		message := "Welcome to Golang with Gorm and Postgres"
		ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": message})
	})

	authRouteController.AuthRoute(router)
	UserRouteController.UserRoute(router)
	CategoryRouteController.CategoryRoute(router)
	ProductRouteController.ProductRoute(router)
	VoucherRouteController.VoucherRoute(router)
	AdminRouteController.AdminRoute(router)
	StoreRouteController.StoreRoute(router)
	CartRouteController.CartRoute(router)
	WishlistRouteController.WishlistRoute(router)
	FeedbackRouteController.FeedbackRoute(router)
	NotesRouteController.NotesRoute(router)

	log.Fatal(server.Run(":" + config.ServerPort))
}

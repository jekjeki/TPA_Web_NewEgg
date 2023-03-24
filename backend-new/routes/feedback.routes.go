package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/controllers"
)

type FeedbackRouteController struct {
	feedbackController controllers.FeedbackController
}

func NewRouteFeedbackController(feedbackController controllers.FeedbackController) FeedbackRouteController {
	return FeedbackRouteController{feedbackController}
}

func (fc *FeedbackRouteController) FeedbackRoute(rg *gin.RouterGroup) {
	router := rg.Group("/feedback")

	//add comment public wishlist detail
	router.POST("/add-comment", fc.feedbackController.AddComment)

	//post comment transactions
	router.POST("/add-comment-transactions", fc.feedbackController.AddCommentTransactions)

	// add new review
	router.POST("/add-new-review", fc.feedbackController.AddReview)

	//add new review transactions
	router.POST("/add-review-transactions", fc.feedbackController.AddReviewTransactions)

	// display all comment in wishlists
	router.GET("/view-all-comments", fc.feedbackController.ViewAllComment)
}

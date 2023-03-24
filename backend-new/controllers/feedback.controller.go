package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/models"
	"gorm.io/gorm"
)

type FeedbackController struct {
	DB *gorm.DB
}

func NewFeedbackController(DB *gorm.DB) FeedbackController {
	return FeedbackController{DB}
}

// create new comment
func (fc *FeedbackController) AddComment(ctx *gin.Context) {
	var payload *models.CommentInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newComment := models.Comment{
		CommentID:    payload.CommentID,
		CommentTitle: payload.CommentTitle,
		CommentDesc:  payload.CommentDesc,
	}

	result := fc.DB.Create(&newComment)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	commentResp := &models.CommentResponse{
		CommentID: newComment.CommentID,
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "comment": commentResp})

}

// create new comment transactions
func (fc *FeedbackController) AddCommentTransactions(ctx *gin.Context) {
	var payload *models.CommenttransactionsInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newCommentTr := models.Commenttransactions{
		CommenttrID: payload.CommenttrID,
		UserwlID:    payload.UserwlID,
		UserID:      payload.UserID,
		CommentID:   payload.CommentID,
	}

	result := fc.DB.Create(&newCommentTr)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	commentTrResp := &models.CommenttransactionsResponse{
		CommenttrID: newCommentTr.CommenttrID,
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "response": commentTrResp})
}

// create new review
func (fc *FeedbackController) AddReview(ctx *gin.Context) {
	var payload *models.ReviewInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newReview := models.Review{
		ReviewID:    payload.ReviewID,
		ReviewValue: payload.ReviewValue,
	}

	result := fc.DB.Create(&newReview)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success"})
}

// add new review transactions
func (fc *FeedbackController) AddReviewTransactions(ctx *gin.Context) {
	var payload *models.ReviewtransactionsInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newReviewTr := models.Reviewtransactions{
		ReviewtrID: payload.ReviewtrID,
		UserwlID:   payload.UserwlID,
	}

	result := fc.DB.Create(&newReviewTr)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "reviewtr_id": payload.ReviewtrID})
}

// view all comment in wishlist
func (fc *FeedbackController) ViewAllComment(ctx *gin.Context) {
	var comment []models.ViewAllCommentResponse

	result := fc.DB.Table("comments").Joins("join commenttransactions cm ON cm.comment_id=comments.comment_id").Joins("join users us ON cm.user_id=us.id").Joins("join userwishlisttransactions ust ON ust.userwl_id=cm.userwl_id").Joins("join reviewtransactions rt ON rt.userwl_id=ust.userwl_id").Joins("join reviews rv ON rv.review_id=rt.review_id").Scan(&comment)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "error", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "comment": comment})

}

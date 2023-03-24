package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/models"
	"gorm.io/gorm"
)

type NotesController struct {
	DB *gorm.DB
}

func NewNotesController(DB *gorm.DB) NotesController {
	return NotesController{DB}
}

// create new notes
func (nc *NotesController) AddNewNotes(ctx *gin.Context) {
	var payload *models.NotesInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newNotes := models.Notes{
		NoteID:   payload.NoteID,
		NoteName: payload.NoteName,
	}

	result := nc.DB.Create(newNotes)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "success", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "response_id": newNotes.NoteID})
}

// add new notes transactions
func (nc *NotesController) AddNotesTransactions(ctx *gin.Context) {
	var payload *models.NotestransactionInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newNotesTr := models.Notestransaction{
		NotetrID:   payload.NotetrID,
		WishlistID: payload.WishlistID,
		NoteID:     payload.NoteID,
	}

	result := nc.DB.Create(&newNotesTr)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "notetr_id": newNotesTr.NotetrID})
}

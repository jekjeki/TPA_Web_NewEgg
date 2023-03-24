package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/controllers"
)

type NotesRouteController struct {
	notesController controllers.NotesController
}

func NewRouteNotesController(notesController controllers.NotesController) NotesRouteController {
	return NotesRouteController{notesController}
}

func (nc *NotesRouteController) NotesRoute(rg *gin.RouterGroup) {
	router := rg.Group("/notes")

	router.POST("/add-notes", nc.notesController.AddNewNotes)

	// add new transactions notes
	router.POST("/add-new-transactions-notes", nc.notesController.AddNotesTransactions)
}

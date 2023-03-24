package models

type Notes struct {
	NoteID   string `gorm:"type:char(10);primary_key"`
	NoteName string `gorm:"type:varchar(30);not null"`
}

type NotesInput struct {
	NoteID   string `json:"note_id" binding:"required"`
	NoteName string `json:"note_name" binding:"required"`
}

package sendemail

import (
	"fmt"
	"net/smtp"
)

func SendMail() {
	auth := smtp.PlainAuth(
		"",
		"yusufzaki013@gmail.com",
		"xnodhfnqsjllbijc",
		"smtp.gmail.com",
	)

	msg := "Subject: Test\nThis is test"

	err := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		"yusufzaki013@gmail.com",
		[]string{"yusufzaki013@gmail.com"},
		[]byte(msg),
	)

	if err != nil {
		fmt.Println(err)
	}
}

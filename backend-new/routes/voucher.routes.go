package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/controllers"
)

type VoucherRouteController struct {
	VoucherRouteController controllers.VoucherController
}

func NewRouteVoucherController(voucherController controllers.VoucherController) VoucherRouteController {
	return VoucherRouteController{voucherController}
}

func (vc *VoucherRouteController) VoucherRoute(rg *gin.RouterGroup) {
	router := rg.Group("/voucher")
	router.POST("insert-voucher", vc.VoucherRouteController.AddVoucher)
}

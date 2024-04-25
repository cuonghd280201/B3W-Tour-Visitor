import React from "react";
import '../Home/detailTour.css'




const DetailTour = () => {
    return (
<div className="flight-hotel-detail detail tour-detail  ">
        <div className="entry-head">
            <section className="section-01-title section-01"><div className="container-xl">
                <div className="row">
                    <div className="col-md-6 col-12 left">
                        <div className="warp-mark">
                            <i className="fal fa-ticket" />
                            <label>NNSGN322-045-010524VN-D</label>
                        </div>
                        <h1 className="title">Siêu Sale 🔥 Trung Quốc: Thượng Hải - Hàng Châu - Vô Tích - Tô Châu - Bắc Kinh - Chinh phục Vạn Lý Trường Thành | Lễ 30/4 - Giá đã giảm 2.000.000vnđ/ khách</h1>
                        <div className="short-rating">
                            <div className="s-rate">
                                <span>9</span>
                                <div className="s-comment">Tuyệt vời<p>1 quan tâm</p>
                                </div>
                            </div>
                            <div className="s-wishlist">
                                <i className="fas fa-heart" />
                                <label> 126</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 right">
                        <div className="group-price">
                            <div className="or-price">
                                <p>Giá<span className="tour-item__price--old__number"> 27.990.000&nbsp;₫</span>
                                    <i> /khách</i>
                                </p>
                            </div>
                            <div className="sale-price">
                                <span className="sale">GIẢM 7%</span><p>
                                    <span className="price">25.990.000&nbsp;₫</span>/ khách</p>
                            </div>
                        </div>
                        <div className="group-add-cart"><a title="Đặt ngay" href="#" className="add-to-cart">
                            <i className="fal fa-shopping-cart">
                            </i>Đặt ngay</a><a href="#" className="add-to-group">Liên hệ tư vấn</a></div>
                    </div>
                </div>
            </div>
            </section>

        </div>

        </div>

    );
}
export default DetailTour;
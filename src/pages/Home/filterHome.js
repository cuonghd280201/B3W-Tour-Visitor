// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const FilterHome = () => {
//     const location = useLocation();
//     const { data } = location.state || {};

//     return (
//         <div>
//             <div className="col-lg-9">
//                 <div className="row">
//                     {data.map(tour => (
//                         <div key={tour.id} className="col-sm col-md-6 col-lg-4 ">
//                             <div className="destination">
//                                 <Link
//                                     to="/detailTour"
//                                     className="text-dark"
//                                     state={{ tourId: tour.id }}
//                                 >
//                                     <a href="" className="img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${tour.coverImage})` }}>
//                                         <div className="icon d-flex justify-content-center align-items-center">
//                                             <span className="icon-link" />
//                                         </div>
//                                     </a>
//                                 </Link>

//                                 <div className="text p-3">
//                                     <p>{tour.createDate} - Giờ đi: {tour.startTime}</p>
//                                     <div className="d-flex">
//                                         <div className="one">
//                                             <h4><a href="#">{tour.title}</a></h4>
//                                             <p className="rate">

//                                             </p>
//                                         </div>
//                                         <div className="two">
//                                             <span className="price per-price">{tour.price}<br /><small>/tour</small></span>
//                                         </div>
//                                     </div>
//                                     <span><img src="/images/tour.png" className="icon-img" />
//                                         {tour.id}</span>
//                                     <p>Nơi Khởi Hành:  {tour.starLocation}</p>
//                                     <p>Nơi Kết Thúc:  {tour.endLocation}</p>
//                                     <h3>Giá : {formatPrice(tour.price)} &nbsp;₫</h3>
//                                     <hr />
//                                     <p className="bottom-area d-flex">
//                                         <span className="ml-auto"><a href="#">Xem chi tiết</a></span>
//                                         <span className="ml-auto"><a href="#">Đặt Lịch</a></span>
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}

//                 </div>


//                 <div className="row mt-5">
//                     <div className="col text-center">
//                         <div className="block-27">
//                             <ul>
//                                 <li><a href="#" onClick={handlePrevious}>&lt;</a></li>
//                                 {Array.from({ length: totalPages }, (_, index) => (
//                                     <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
//                                         <a href="#" onClick={() => setCurrentPage(index + 1)}>{index + 1}</a>
//                                     </li>
//                                 ))}
//                                 <li><a href="#" onClick={handleNext}>&gt;</a></li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FilterHome;



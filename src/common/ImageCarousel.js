import { useRef } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/modules/navigation/navigation.min.css";
// Import Swiper styles
// import "swiper/css";
import "swiper/modules/pagination/pagination.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
// Import Swiper React components
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/system";

import "./ImageCarousel.css";

const PreviewButton = styled(Button)({
    color: "#F6F8F9",
    fontWeight: "400",
    fontSize: "18px",
    "&:hover": {
        backgroundColor: "transparent",
    },
});

const DeleteButton = styled(IconButton)({
    borderRadius: "50%",
    backgroundColor: "#fff",
    "&:hover": {
        backgroundColor: "#fff",
    },
});

const SliderNavButton = styled(IconButton)({
    backgroundColor: "#5B6871",
    color: "#FFFFFF",
    borderRadius: "50%",
    "&:hover": {
        backgroundColor: "#5B6871",
    },
});

const ImagesCarousel = ({
    images,
    setImagePreview,
    setImagePreviewUrl,
    removeImage,
}) => {
    const swiperRef = useRef();

    const openImagePreview = (url) => {
        setImagePreview(true);
        setImagePreviewUrl(url);
    };

    return (
        <Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                {images && images.length > 3 && (
                    <SliderNavButton
                        sx={{ mr: -2, zIndex: 2 }}
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <ArrowBackRoundedIcon />
                    </SliderNavButton>
                )}
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={
                        images && images.length > 2 ? 3 : images.length
                    }
                    pagination={{
                        el: ".custom-carousel-pagination",
                        type: "fraction",
                        renderFraction: function (currentClass, totalClass) {
                            return (
                                '<span class="' +
                                currentClass +
                                '"></span>' +
                                " <span>/</span> " +
                                '<span class="' +
                                totalClass +
                                '"></span>'
                            );
                        },
                    }}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                >
                    {images.map((image, idx) => (
                        <SwiperSlide key={idx}>
                            <Box className="carousel-img">
                                <img
                                    src={image}
                                    alt={image}
                                    onError={() => removeImage(idx)}
                                    className="carousel-clear"
                                />
                                {/* <img
                                    src={image}
                                    alt={image}
                                    className="carousel-fade"
                                /> */}
                                <Box className="carousel-hover">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            height: "100%",
                                        }}
                                    >
                                        <PreviewButton
                                            variant="text"
                                            startIcon={<VisibilityIcon />}
                                            disableRipple
                                            onClick={() =>
                                                openImagePreview(image)
                                            }
                                        >
                                            Preview
                                        </PreviewButton>
                                        <DeleteButton
                                            sx={{
                                                p: 0,
                                                m: 1,
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                            }}
                                            onClick={() => removeImage(idx)}
                                        >
                                            <CloseIcon color="error" />
                                        </DeleteButton>
                                    </Box>
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {images && images.length > 3 && (
                    <SliderNavButton
                        sx={{ ml: -2, zIndex: 2 }}
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <ArrowForwardRoundedIcon />
                    </SliderNavButton>
                )}
            </Box>
            {images && images.length > 0 && (
                <Box display="flex" justifyContent="end">
                    <Box className="custom-carousel-pagination" />
                </Box>
            )}
        </Box>
    );
};

export default ImagesCarousel;

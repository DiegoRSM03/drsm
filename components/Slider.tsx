"use client"

// Libs
import Image, { StaticImageData } from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

interface Props {
  images: StaticImageData[]
  section: string
}

export const Slider = ({ images, section }: Props) => {
  return (
    <Swiper
      autoplay={{ delay: 2500 }}
      className="w-full h-full"
      modules={[Autoplay]}
      loop
    >
      {images.map((image, index) => (
        <SwiperSlide
          key={`${section}-${index}-swiper-slider`}
          className="w-full h-full"
        >
          <Image
            alt={`Image for about ${section} inner section`}
            src={image}
            width={700}
            height={430}
            quality={100}
            className="h-[430px] max-w-[700px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

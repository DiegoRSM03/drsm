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
      autoplay={{ delay: 3000 }}
      className="w-full h-full overflow-hidden rounded-md"
      modules={[Autoplay]}
      loop
    >
      {images.map((image, index) => (
        <SwiperSlide
          key={`${section}-${index}-swiper-slider`}
          className="w-full h-full overflow-hidden rounded-md"
        >
          <Image
            alt={`Image for about ${section} inner section`}
            src={image}
            width={700}
            height={430}
            quality={100}
            className="h-[220px] max-w-full md:h-[430px] md:w-[700px] md:max-w-[700px] object-cover rounded-md overflow-hidden"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

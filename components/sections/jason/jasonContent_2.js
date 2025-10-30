import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { buildImageUrl } from "@/lib/cloudinary";
import { JasonImage } from "@/constants/assest";
import ImageModel from "@/components/ImageModel";

gsap.registerPlugin(ScrollTrigger);

function JasonContent_2() {
  const PartTwoRef = useRef(null);
  const rightSideRef = useRef(null);
  const fadeImageRef = useRef(null);

  const ImageFour = buildImageUrl(JasonImage.Image_4.src);
  const ImageFive = buildImageUrl(JasonImage.Image_5.src);
  const ImageSix = buildImageUrl(JasonImage.Image_6.src);

  const ImageViewerFour = buildImageUrl(JasonImage.Viwer_4.src);
  const ImageViewerFive = buildImageUrl(JasonImage.Viwer_5.src);
  const ImageViewerSix = buildImageUrl(JasonImage.Viwer_6.src);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          let { isDesktop, isTablet, isMobile } = context.conditions;

          if(isDesktop) {
            gsap.set(PartTwoRef.current, { marginTop: "190vh" });

          } else if(isTablet) {

          } else if (isMobile) {

          }
          gsap.set(fadeImageRef.current, { opacity: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: PartTwoRef.current,
              start: "top center",
              end: "+=1800 ",
              scrub: 1.5,
              ease: "none",
              // markers: true,
            },
          });

          tl.to(rightSideRef.current, {
            y: 200,
            ease: "none",
            duration: 1.8,
          }).to(
            fadeImageRef.current,
            { opacity: 1, ease: "none", duration: 0.5 },
            "0"
          );
        }
      );
    },
    {
      scope: PartTwoRef,
    }
  );
  return (
    <section ref={PartTwoRef} className="relative z-10 grid-gallary gap-5">
      <div className="col-[main-start/4] flex flex-col gap-5 jason-content ">
        <h2 className=" text-pink text-3xl lg:text-[2.5rem] xl:text-[2.4rem] font-round font-bold text-balance leading-8 lg:leading-10 xl:leading-10 mb-20 self-center">
          Another day in
          <br />
          paradise, right?
        </h2>
        <div className="grid grid-cols-3 grid-row-3 gap-5 ">
          <div className="relative aspect-[1/1] max-w-full h-auto col-[1/4] overflow-hidden">
            <ImageModel
              src={ImageFive}
              viewerImg={ImageViewerFive}
              alt={JasonImage.Image_5.alt}
              sizes={JasonImage.Image_5.size}
              className="object-cover [object-position:0%_center] "
              ButtonStyle="w-full h-full "
            />
          </div>
          <div className="relative aspect-[1/1] max-w-full h-auto col-[2/4] overflow-hidden">
            <ImageModel
              src={ImageSix}
              viewerImg={ImageViewerSix}
              alt={JasonImage.Image_6.alt}
              sizes={JasonImage.Image_6.size}
              className=" object-cover [object-position:20%_center]  "
              ButtonStyle="h-full w-full"
              fadeImageRef={fadeImageRef}
            />
          </div>
        </div>
      </div>

      <div
        ref={rightSideRef}
        className="flex flex-col jason-content col-[4/content-end]  gap-5"
      >
        <p className="text-white  lg:text-[1.2rem]  text-balance md:mx-5 xl:mx-25 mb-15 font-round font-black leading-tight slef-center">
          Meeting Lucia could be the best or worst thing to ever happen to him.
          Jason knows how he&apos;d like it to turn out but right now, it&apos;s
          hard to tell.
        </p>
        <div className="relative aspect-[9/16] max-w-full h-auto overflow-hidden">
          <ImageModel
            src={ImageFour}
            viewerImg={ImageViewerFour}
            alt={JasonImage.Image_4.alt}
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            className="object-cover [object-position:25%_center]"
            ButtonStyle="w-full h-full "
          />
        </div>
      </div>
    </section>
  );
}

export default JasonContent_2;

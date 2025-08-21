import Image from 'next/image';

function Hero() {
  return (
    <section id="jason" className="hero-section">
      <div className="hero-background">
        <Image src="/images/hero-bg.webp" alt="Hero Background" className="object-cover " width={1366} height={1080} />
      </div>
      <h1 className="hero-title">Welcome to GTA VI</h1>
      <p className="hero-description">
        Experience the thrill like never before.
      </p>
     
    </section>
  );
}

export default Hero;

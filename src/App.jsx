import { useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown,
  Clock3, Instagram, MapPin, Menu, MessageCircle, Scissors, Sparkles,
  X, Flower2, Heart, Hand, GraduationCap, Crown, MoveUpRight, Plus
} from 'lucide-react'

const WHATSAPP = '2348153144870'
const waLink = (message) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`
const localDate = () => { const now = new Date(); const offset = now.getTimezoneOffset() * 60000; return new Date(now.getTime() - offset).toISOString().slice(0, 10) }

const services = [
  { name: 'Hair & Braids', detail: 'Protective styles, braids and beautifully finished looks.', icon: Scissors, number: '01', image: '/images/braids-installation.webp' },
  { name: 'Dreads & Locs', detail: 'Loc styling and care, with attention to every detail.', icon: Sparkles, number: '02', image: '/images/locs-finish.webp' },
  { name: 'Nails', detail: 'Nail care and expressive finishing touches.', icon: Hand, number: '03', image: '/images/nail-art.webp' },
  { name: 'Mani & Pedi', detail: 'A little reset for your hands and feet.', icon: Flower2, number: '04', image: '/images/salon-experience.webp' },
  { name: 'Lashes', detail: 'Lash services to complete your look.', icon: Heart, number: '05', image: '/images/beauty-style.webp' },
  { name: 'Piercings', detail: 'Personal style, thoughtfully finished.', icon: Crown, number: '06', image: '/images/stylist-at-work.webp' },
  { name: 'Ponytails', detail: 'Sleek, polished and occasion-ready styles.', icon: Sparkles, number: '07', image: '/images/curly-finish.webp' },
  { name: 'Classes & Training', detail: 'Beauty learning and practical training enquiries.', icon: GraduationCap, number: '08', image: '/images/hair-wash.webp' },
]

const gallery = [
  { src: '/images/curly-finish.webp', alt: 'Finished curly hairstyle', label: 'Defined curls', type: 'HAIR' },
  { src: '/images/braids-installation.webp', alt: 'Braids being installed by a stylist', label: 'Braids, with care', type: 'BRAIDS' },
  { src: '/images/nail-art.webp', alt: 'Nail art detail', label: 'Nail artistry', type: 'NAILS' },
  { src: '/images/locs-finish.webp', alt: 'Finished loc hairstyle', label: 'Locs, beautifully done', type: 'LOCS' },
  { src: '/images/stylist-at-work.webp', alt: 'Stylist working with a client', label: 'The studio experience', type: 'THE STUDIO' },
  { src: '/images/hair-wash.webp', alt: 'Relaxing hair wash service', label: 'A moment to reset', type: 'SELF CARE' },
]

function useReveal() {
  const root = useRef(null)
  useEffect(() => {
    const nodes = root.current?.querySelectorAll('[data-reveal]') || []
    if (!('IntersectionObserver' in window)) { nodes.forEach(node => node.classList.add('is-visible')); return }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])
  return root
}

function App() {
  const revealRoot = useReveal()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(null)
  const [selectedService, setSelectedService] = useState('Hair & Braids')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [faqOpen, setFaqOpen] = useState(0)
  useEffect(() => {
    if (!activeImage && !menuOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { setActiveImage(null); setMenuOpen(false) }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeImage, menuOpen])
  const navItems = [['The experience', '#experience'], ['Services', '#services'], ['Our work', '#gallery'], ['Find us', '#visit']]
  const closeMenu = () => setMenuOpen(false)

  function submitBooking(e) {
    e.preventDefault()
    const message = [
      'Hello Luxe Beauty Place! I would like to request an appointment.',
      `Name: ${name}`, `Phone: ${phone}`, `Service: ${selectedService}`,
      date ? `Preferred date: ${date}` : '', time ? `Preferred time: ${time}` : '',
      notes ? `Additional details: ${notes}` : '',
      'Please confirm availability and any applicable pricing. Thank you!'
    ].filter(Boolean).join('\n')
    window.open(waLink(message), '_blank', 'noopener,noreferrer')
  }

  const faqs = [
    ['How do I book an appointment?', 'Choose your service and preferred date in the booking form. Your request opens in WhatsApp so the team can confirm a suitable time with you.'],
    ['Where are you located?', 'Find us at 319B, New Oko-Oba Road, opposite Maple Wood Estate, beside Mobile Station, Lagos.'],
    ['What are your opening hours?', 'We are listed as open Monday to Saturday, from 9:00 AM to 7:00 PM. Please message the salon to confirm availability before visiting.'],
    ['Do you have any special offers?', 'The salon advertises 20% off every Tuesday. Message the team to confirm which services are included.'],
  ]

  return (
    <div className="site-shell" ref={revealRoot}>
      <div className="announcement"><span className="announcement-mark">✳</span><span>YOUR BEAUTY MOMENT, YOUR WAY</span><span className="announcement-divider"/><span>20% OFF EVERY TUESDAY</span><a href={waLink('Hello Luxe Beauty Place! I would like to ask about your Tuesday offer.')} target="_blank" rel="noreferrer">ASK US <ArrowUpRight size={13}/></a></div>

      <header className="header">
        <a href="#home" className="brand" aria-label="Luxe Beauty Place home"><img src="/images/luxe-wordmark.png" alt="Luxe Beauty Place"/><span>BEAUTY, ELEVATED.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
        <a className="header-cta" href="#booking"><span>Book your visit</span><span className="cta-icon"><ArrowUpRight size={16}/></span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation">{menuOpen ? <X/> : <Menu/>}</button>
      </header>
      {menuOpen && <div className="mobile-menu" id="mobile-navigation">{navItems.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}<ArrowUpRight size={16}/></a>)}<a className="mobile-book" href="#booking" onClick={closeMenu}>Book your visit <ArrowUpRight size={16}/></a></div>}

      <main>
        <section className="hero" id="home">
          <div className="hero-kicker"><span className="live-dot"/> LAGOS, NIGERIA <span className="kicker-slash">/</span> BEAUTY & PERSONAL CARE</div>
          <div className="hero-grid">
            <div className="hero-copy">
              <h1>Beauty<br/>looks <em>good</em><br/>on <span>you.</span></h1>
              <p className="hero-intro">A little more care. A little more confidence. A beauty space for the looks, details and moments that make you feel like yourself.</p>
              <div className="hero-actions"><a className="button button-dark" href="#booking">Find your appointment <ArrowUpRight size={17}/></a><a className="hero-secondary" href="#services">Explore the experience <ArrowDownRight size={17}/></a></div>
              <div className="hero-proof"><div className="proof-symbol">L<span>✳</span></div><div><strong>YOUR DESTINATION FOR LUXURY BEAUTY</strong><span>Hair · Nails · Lashes · Self-care</span></div></div>
            </div>
            <div className="hero-art" aria-label="Luxe Beauty Place salon imagery">
              <div className="hero-photo hero-photo-main"><img src="/images/curly-finish.webp" alt="A finished curly hairstyle"/><span className="photo-index">01 / THE FINISH</span></div>
              <div className="hero-photo hero-photo-inset"><img src="/images/nail-art.webp" alt="A detail of nail artistry"/></div>
              <div className="hero-orbit"><span>THE LUXE<br/>FEELING</span><i>✳</i></div>
              <div className="hero-side-note">A LITTLE MORE<br/><em>you-time.</em></div>
              <div className="hero-vertical">MADE FOR YOUR MOMENT — EST. IN LAGOS</div>
            </div>
          </div>
          <div className="hero-bottom"><span>SCROLL TO FEEL THE DIFFERENCE</span><span className="hero-bottom-line"/><span>01 — 05</span></div>
        </section>

        <section className="marquee" aria-label="Luxe Beauty Place services"><div className="marquee-track">{Array.from({length:2}).map((_,i)=><div className="marquee-group" key={i}><span>HAIR THAT TURNS HEADS</span><i>✳</i><span>NAILS WITH PERSONALITY</span><i>✳</i><span>TIME FOR YOURSELF</span><i>✳</i><span>BEAUTY, YOUR WAY</span><i>✳</i></div>)}</div></section>

        <section className="manifesto" id="experience">
          <div className="manifesto-label" data-reveal><span>01 / THE LUXE EXPERIENCE</span><span className="small-rule"/></div>
          <div className="manifesto-content" data-reveal><p>Not just a new look.<br/>A <em>whole feeling.</em></p><div className="manifesto-aside"><span className="manifesto-star">✳</span><p>Beauty is personal. Your experience should be too. Come as you are; leave feeling a little more like you.</p><a href="#booking" className="under-link">MAKE TIME FOR YOU <ArrowUpRight size={14}/></a></div></div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-topline" data-reveal><span>02 / WHAT WE DO</span><span>GOOD DAYS START HERE</span></div>
          <div className="section-heading" data-reveal><h2>Find your<br/><em>kind of luxe.</em></h2><div className="heading-side"><p>From statement styles to the little details, explore the services that help you feel your best.</p><a className="under-link" href="#booking">LET'S GET YOU STARTED <ArrowUpRight size={14}/></a></div></div>
          <div className="service-list">{services.map((service,index)=>{const Icon=service.icon;return <button className="service-row" key={service.name} onClick={()=>{setSelectedService(service.name);document.querySelector('#booking')?.scrollIntoView({behavior:'smooth'})}} data-reveal style={{'--delay':`${index*45}ms`}}><span className="service-number">{service.number}</span><span className="service-image"><img src={service.image} alt="" loading="lazy"/></span><span className="service-name">{service.name}</span><span className="service-detail">{service.detail}</span><span className="service-arrow"><ArrowUpRight size={19}/></span></button>})}</div>
          <div className="service-foot"><span>CAN'T SEE WHAT YOU'RE LOOKING FOR?</span><a href={waLink('Hello Luxe Beauty Place! I would like to enquire about your services.')} target="_blank" rel="noreferrer">Talk to the team <ArrowUpRight size={14}/></a></div>
        </section>

        <section className="editorial-feature">
          <div className="editorial-image" data-reveal><img src="/images/stylist-at-work.webp" alt="A stylist carefully working with a client"/><span className="editorial-image-label">THE ART OF FEELING GOOD / 02</span></div>
          <div className="editorial-copy" data-reveal><div className="section-topline light"><span>03 / THE LITTLE DETAILS</span><span>THE LUXE DIFFERENCE</span></div><h2>Care is<br/>the <em>whole</em><br/>point.</h2><p>It's in the thoughtful touch, the attention to detail and the time you get to spend on yourself. We make room for all of it.</p><a className="button button-light" href="#booking">Come experience Luxe <ArrowUpRight size={16}/></a><div className="editorial-sign">LUXE BEAUTY PLACE <span>✳</span></div></div>
        </section>

        <section className="gallery section-pad" id="gallery">
          <div className="section-topline" data-reveal><span>04 / THE LOOKBOOK</span><span>REAL WORK. REAL BEAUTY.</span></div>
          <div className="section-heading gallery-heading" data-reveal><h2>Made with care.<br/><em>Worn with confidence.</em></h2><div className="heading-side"><p>A little inspiration from the work we do. Find a look you love, then ask us how to make it yours.</p><a className="under-link" href="https://www.instagram.com/luxebeautyplace/" target="_blank" rel="noreferrer">FOLLOW THE LUXE STORY <ArrowUpRight size={14}/></a></div></div>
          <div className="gallery-grid">{gallery.map((item,i)=><button className={`gallery-item gallery-item-${i+1}`} key={item.src} onClick={()=>setActiveImage(item)} aria-label={`View ${item.label}`} data-reveal style={{'--delay':`${i*55}ms`}}><img src={item.src} alt={item.alt} loading="lazy"/><span className="gallery-meta"><small>{item.type}</small><strong>{item.label}</strong><i><ArrowUpRight size={18}/></i></span></button>)}</div>
          <div className="gallery-bottom"><span>MORE LOOKS, MORE INSPIRATION</span><a href="https://www.instagram.com/luxebeautyplace/" target="_blank" rel="noreferrer"><Instagram size={16}/> @LUXEBEAUTYPLACE <ArrowUpRight size={14}/></a></div>
        </section>

        <section className="offer">
          <div className="offer-watermark">20</div><div className="offer-copy" data-reveal><div className="section-topline light"><span>05 / A LITTLE SOMETHING EXTRA</span><span>YOUR TUESDAY TREAT</span></div><div className="offer-main"><span className="offer-number">20<sup>%</sup></span><div className="offer-words"><span>OFF</span><strong>Tuesdays.</strong><small>MAKE TUESDAY YOUR LUXE DAY</small></div></div><p>Make room for a little treat. Enjoy the advertised Tuesday offer on beauty services. Ask our team which services are included.</p><a className="button button-light" href={waLink('Hello Luxe Beauty Place! I would like to know which services are included in the 20% Tuesday offer.')} target="_blank" rel="noreferrer">Ask about the offer <ArrowUpRight size={16}/></a></div><div className="offer-side" data-reveal><div className="offer-seal">A GOOD DAY<br/>TO FEEL GOOD <span>✳</span></div><span className="offer-caption">A LITTLE MORE LUXE, ON US.</span></div>
        </section>

        <section className="booking section-pad" id="booking">
          <div className="booking-copy" data-reveal><div className="section-topline"><span>06 / YOUR NEXT LUXE MOMENT</span></div><h2>Let's make<br/>time for <em>you.</em></h2><p>One little form is all it takes to get started. Tell us what you're after and we'll take it from there on WhatsApp.</p><div className="booking-detail"><span className="detail-icon"><Clock3 size={18}/></span><div><strong>MONDAY – SATURDAY</strong><span>9:00 AM – 7:00 PM</span></div></div><div className="booking-detail"><span className="detail-icon"><MapPin size={18}/></span><div><strong>COME FIND US</strong><span>319B, New Oko-Oba Road, Lagos</span></div></div><div className="booking-whatsapp"><MessageCircle size={17}/><a href={waLink('Hello Luxe Beauty Place! I have a question about booking.')} target="_blank" rel="noreferrer">Prefer to chat? Message us directly <ArrowUpRight size={14}/></a></div></div>
          <form className="booking-form" onSubmit={submitBooking} data-reveal><div className="form-heading"><span>YOUR APPOINTMENT REQUEST</span><span>LET'S BEGIN <Sparkles size={13}/></span></div><h3>First, the little details.</h3><p className="form-intro">Share your preferences. The salon will confirm your appointment personally.</p><label>Your name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Ada Okafor" autoComplete="name"/></label><label>Phone number<input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Your contact number" autoComplete="tel" inputMode="tel"/></label><label>Choose a service<span className="select-wrap"><select value={selectedService} onChange={e=>setSelectedService(e.target.value)}>{services.map(s=><option key={s.name}>{s.name}</option>)}</select><ChevronDown size={16}/></span></label><div className="form-row"><label>Preferred date<input type="date" value={date} min={localDate()} onChange={e=>setDate(e.target.value)}/></label><label>Preferred time<span className="select-wrap"><select value={time} onChange={e=>setTime(e.target.value)}><option value="">Any suitable time</option>{['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'].map(t=><option key={t}>{t}</option>)}</select><ChevronDown size={16}/></span></label></div><label>Anything else? <span className="optional">OPTIONAL</span><textarea rows="3" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Tell us a little more about the look you have in mind..."/></label><button className="button button-dark form-submit" type="submit">Continue to WhatsApp <ArrowUpRight size={17}/></button><p className="form-footnote"><Check size={13}/> No payment required to send a request.</p></form>
        </section>

        <section className="faq section-pad"><div className="faq-title" data-reveal><div className="section-topline"><span>07 / GOOD TO KNOW</span></div><h2>A few little<br/><em>details.</em></h2><p>Everything you need to know before your visit.</p></div><div className="faq-list" data-reveal>{faqs.map(([q,a],i)=><div className={`faq-item ${faqOpen===i?'faq-active':''}`} key={q}><button onClick={()=>setFaqOpen(faqOpen===i?-1:i)} aria-expanded={faqOpen===i}><span className="faq-num">0{i+1}</span><strong>{q}</strong><span className="faq-plus">{faqOpen===i?'−':'+'}</span></button>{faqOpen===i&&<p>{a}</p>}</div>)}</div></section>

        <section className="visit" id="visit"><div className="visit-text" data-reveal><div className="section-topline light"><span>08 / COME ON IN</span></div><h2>We'll save<br/>you a <em>seat.</em></h2><p>Your next favourite look could be just around the corner. Come by, say hello and let us help you find it.</p><a className="button button-light" href="https://www.google.com/maps/search/?api=1&query=319B+New+Oko-Oba+Road+Lagos+Nigeria" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16}/></a></div><div className="visit-card" data-reveal><div className="visit-card-top"><MapPin size={19}/><span>FIND LUXE BEAUTY PLACE</span></div><h3>319B, New Oko-Oba Road</h3><p>Opposite Maple Wood Estate,<br/>beside Mobile Station,<br/>Lagos, Nigeria.</p><div className="visit-card-rule"/><div className="visit-hours"><span>MON – SAT</span><strong>9 AM – 7 PM</strong></div><div className="visit-hours"><span>SUNDAY</span><strong>Closed</strong></div><a href="https://www.google.com/maps/search/?api=1&query=319B+New+Oko-Oba+Road+Lagos+Nigeria" target="_blank" rel="noreferrer">OPEN IN MAPS <ArrowUpRight size={14}/></a></div></section>
      </main>

      <footer className="footer"><div className="footer-top"><a href="#home" className="footer-brand"><img src="/images/luxe-wordmark.png" alt="Luxe Beauty Place"/><span>BEAUTY, ELEVATED.</span></a><p>A destination for luxury beauty,<br/>self-care and feeling like yourself.</p><a className="footer-book" href="#booking">BOOK YOUR VISIT <ArrowUpRight size={15}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} LUXE BEAUTY PLACE. ALL RIGHTS RESERVED.</span><div><a href="https://www.instagram.com/luxebeautyplace/" target="_blank" rel="noreferrer"><Instagram size={15}/> INSTAGRAM</a><a href={waLink('Hello Luxe Beauty Place!')} target="_blank" rel="noreferrer"><MessageCircle size={15}/> WHATSAPP</a></div><a href="#home" className="back-top">BACK TO TOP ↑</a></div></footer>
      <a className="floating-wa" href={waLink('Hello Luxe Beauty Place! I would like to make an enquiry.')} target="_blank" rel="noreferrer" aria-label="Chat with Luxe Beauty Place on WhatsApp"><MessageCircle size={20}/><span>CHAT WITH US</span></a>
      <a className="mobile-booking-dock" href="#booking"><CalendarDays size={16}/> BOOK YOUR VISIT <ArrowUpRight size={16}/></a>
      {activeImage && <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeImage.label} onClick={()=>setActiveImage(null)}><button className="lightbox-close" onClick={()=>setActiveImage(null)} aria-label="Close image"><X/></button><img src={activeImage.src} alt={activeImage.alt} onClick={e=>e.stopPropagation()}/><span>{activeImage.label}</span></div>}
    </div>
  )
}
export default App

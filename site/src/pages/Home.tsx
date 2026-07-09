function Home() {
  return (
    <section className="bg-menu px-10 md:px-20 pb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-20">
      <h1 className="max-w-full md:max-w-[62%] w-[935px] text-smXl font-serif tracking-wide">
        Алмазное сверление, резка проёмов и демонтаж сложных конструкций
      </h1>
      <div className="flex flex-row gap-5">
        <a
          className="flex items-center gap-5 border no-underline cursor-pointer bg-black border-black text-white rounded-md hover:border-notification hover:bg-notification hover:text-black px-12 py-4 min-h-34 [&_svg_path]:hover:stroke-black"
          href="https://displaay.net/trials"
          data-discover="true"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8461538461538463" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon icon-download">
            <path d="M12 1L12 18"></path>
            <path d="M3 22L21 22"></path>
            <path d="M3 9L12 18L21 9"></path>
          </svg>
          Trials
        </a>
        <button type="button" className="flex items-center gap-5 border rounded-md no-underline cursor-pointer bg-menthol border-menthol text-black hover:bg-notification hover:border-notification px-12 py-4 min-h-34">Tester</button>
        <button type="button" className="flex items-center gap-5 border rounded-md no-underline cursor-pointer bg-shop border-shop text-black hover:bg-notification hover:border-notification px-12 py-4 min-h-34">Buy</button>
      </div>
    </section>
  )
}

export default Home

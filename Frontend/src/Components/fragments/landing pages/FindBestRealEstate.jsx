const FindBestRealEstate = () => {
  return (
   <div className="container mx-auto">
     <div className= "  mx-auto grid md:grid-cols-12 sm:grid-cols-1 items-center justify-center gap-10  sm:mx-5 my-10 py-10 px-5">
      <div className="md:col-span-6 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">Find Your Best Real Estate</h1>
        <p className="my-5">
          We provide a complete service for the sale, purchase, or real estate.
          We are a real estate agency based in Indonesia that has been around
          for more than 20 years. We have helped countless people find their
          dream home.
        </p>
        <button className="bg-[#FF7043] text-white py-3 px-5 rounded-lg font-bold hover:bg-blue-700 hover:text-white w-2/3 lg:w-1/3">
          Contact us
        </button>
      </div>
      <div className="md:col-span-6 flex justify-center">
        <img
          className="max-w-full h-auto"
          src="https://s3-alpha-sig.figma.com/img/56c0/ecea/f86baa4381d698f4d8af2f652c7b68c3?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ITz8vtOupM-aoU6GSglNSU5i0TQmFr-JTYhyc0W7aSa55IT2ieFtb73Z2Ct3gz42LK30ZVF1ZjLhaAWtnyVIi2bBzHzrQ3dmsw~DlXqXONZUNLTds11fFShcqkOAgpc24nBSMBmkpxt4QdKr8vdj3~T8Bi7VfuWUlJT1pVEbSWq5-IUGtnzhoVrmg1~jauYpGZmjPA5x4NjPhUvXBmC6kI~-WYeYYLyAOmnxpS481jdu9Pb0D4~80Z84EAjYrI10MYXs4EBJQ~NEjl4f5B8m1wglsE~4Iz2B4WB8eWOKKbOwksJM~aq0D4N-GPgFYS8nivxr5FFyEzRAlsXFa7biQQ__"
          alt=""
        />
      </div>
    </div>
   </div>
  );
};

export default FindBestRealEstate;

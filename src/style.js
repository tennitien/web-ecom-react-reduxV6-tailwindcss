const styles = {
  boxContainer: 'md:max-w-5xl mx-auto',

  heading2:
    'font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full',
  paragraph:
    'font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]',

  flexCenter: 'flex justify-center items-center',
  flexStart: 'flex justify-start items-center',
  flexBetween: 'flex justify-between items-center',
  flexBetweenMd: 'md:flex md:justify-between md:items-center',
  paddingX: 'sm:px-16 px-6',
  paddingY: 'sm:py-16 py-6',
  padding: 'sm:px-4 p-3',

  marginX: 'sm:mx-16 mx-6',
  marginY: 'sm:my-16 my-6',

  tooltipContainer: 'group relative',
  tooltipItem:
    'hidden group-hover:block absolute top-0 right-0  p-3 bg-white font-bold shadow-lg',

  input:
    'border border-gray-300 text-gray-900 text-sm  focus:ring-red-400 focus:border-red-400 block w-full p-4',
};

/*
.tooltip {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 5px;
  display: none;
}

*/

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;

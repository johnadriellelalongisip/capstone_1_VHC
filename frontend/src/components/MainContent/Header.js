import { Breadcrumb } from "flowbite-react";
import { useContext } from "react";
import { HiHome } from "react-icons/hi2";
import { colorTheme } from "../../App";

const Header = ({ title, icon }) => {
  const [selectedTheme] = useContext(colorTheme);

  const titleArray = title.replace('_', ' ').split(' ');
  const capitalizedArray = titleArray.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  const headTitle = capitalizedArray.map(word => word + " ");
  return (
    <div className="flex flex-row justify-between items-center">
      <p
        className={`flex gap-1 items-center text-xl md:text-2xl lg:text-3xl font-bold antialiased text-${selectedTheme}-700`}
      >
        { icon }
        { headTitle }
      </p>
      <Breadcrumb className="text-sm md:text-md lg:text-base hidden md:block lg:block">
        <Breadcrumb.Item icon={HiHome}>
          Home
        </Breadcrumb.Item>
        {
          title !== 'Home' && (
            <Breadcrumb.Item>{ headTitle }</Breadcrumb.Item>
          )
        }
      </Breadcrumb>
    </div>
  );
}
 
export default Header;
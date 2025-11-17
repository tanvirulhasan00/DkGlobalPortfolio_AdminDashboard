import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const Footer = () => {
  return (
    <div className="w-full h-full">
      {/* <div className="bg-gray-300 dark:bg-gray-700 h-[0.01rem]"></div> */}
      <div className="flex items-center h-full gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <p className="text-sm">Copyright &copy; 2025 Logic Ninja Inc.</p>
      </div>
    </div>
  );
};

export default Footer;

export default function Header() {
    return <div className="px-[33px] bg-black text-white flex flex-row items-center justify-between">
        <img  width={"300px"}
        src="https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/post_attachments/wp-content/uploads/2023/04/KFintech.jpg" />
        
        <div className="flex flex-row space-x-4">
            <p>Solutions</p>
            <p>Products</p>
            <p>About Us</p>
            <p>Portfolio Companies</p>
        </div>

        <div className="flex flex-row space-x-4">
            <p>Career</p>
            <p>Blogs</p>
            <p>Shareholder Relations</p>
            <p>Contact Us</p>
        </div>

    </div>
}

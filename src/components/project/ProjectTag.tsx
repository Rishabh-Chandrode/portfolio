import React from "react";

const ProjectTag = ({ name, click_handler, is_selected } : { name: string , click_handler: (tag: string) => void, is_selected: boolean}) => {

    const buttonStyles = is_selected ? "text-white bg-primary-700" : "text-[#ABD7BE] border-slate-600 hover:border-white";

    return (
        <div>
            <button onClick={() => click_handler(name)} className={` ${buttonStyles} rounded-full border-2  px-4 py-2 text-xl cursor-pointer`} >
                {name}
            </button>
        </div>
    )
}


export default ProjectTag;

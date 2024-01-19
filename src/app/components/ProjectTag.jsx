import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {

    const buttonStyles = isSelected ? "text-white bg-primary-500" : "text-[#ABD7BE] border-slate-600 hover:border-white";

    return (
        <div>
            <button onClick={() => onClick(name)} className={` ${buttonStyles} rounded-full border-2  px-4 py-2 text-xl cursor-pointer`} >
                {name}
            </button>
        </div>
    )
}


export default ProjectTag;

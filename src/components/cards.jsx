import React from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { WhiteIconButton } from "./buttons";


export const ListingCard = ({
    listing_name,
    listing_image,
    listing_description,
}) => {
    return (
        <div className="flex flex-col gap-3 justify-between h-full p-5">
            <img src={listing_image} alt={"Listing Image"} className="rounded-lg w-full object-cover desktop:w-full tablet:h-[20vh] h-[25vh] desktop:h-[25vh]" />
            <h2 className="text-xl desktop:text-2xl font-medium text-green_s4">{listing_name}</h2>
            <p className="tablet:text-sm desktop:text-md">{listing_description}</p>
            <span className="w-full flex flex-row-reverse items-center gap-2 text-green_s1 hover:text-green_s4">
                <WhiteIconButton
                    backgroundColor=""
                    textStyle=""
                    iconColor=""
                    text="Learn More"
                />
            </span>
        </div>
    );
};

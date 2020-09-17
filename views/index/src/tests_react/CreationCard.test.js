import React from "react";
import Enzyme, { shallow } from "enzyme";
import CreationCard from "../js/CreationCard";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

test("Creation card displays information correctly", () => {
    const paramSrc = "https://via.placeholder.com/300";
    const paramUrlSlug = "placeholder";
    const paramChildren = <p>Placeholder Name</p>;

    // Render component
    const component = shallow(
        <CreationCard src={paramSrc} url_slug={paramUrlSlug}>
            {paramChildren}
        </CreationCard>
    );

    // Name (Children)
    expect(
        component.find(".card .side-b .content").contains(paramChildren)
    ).toEqual(true);

    // Image URL (src)
    expect(component.find(".card .side-a img").prop("src")).toEqual(paramSrc);

    // URL slug (to/href)
    expect(component.find(".card Link").prop("to")).toEqual(
        "/portfolio/" + paramUrlSlug
    );
});

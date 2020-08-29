import React, { useLayoutEffect, useState } from "react";
import { navigate } from "@reach/router";

const ValidateAdmin = (props) => {
    const [validAdmin, setValidAdmin] = useState({ valid: undefined });

    useLayoutEffect(() => {
        if (validAdmin.valid == undefined) {
            fetch("/api/validate", { method: "POST" })
                .then((response) => response.json())
                .then((data) => {
                    setValidAdmin(data);
                });
        }
    });

    if (validAdmin.valid) {
        return props.children;
    } else {
        if (validAdmin.valid == undefined) {
            return <div>Loading...</div>;
        } else {
            navigate("/admin/login");
            return null;
        }
    }
};

export default ValidateAdmin;

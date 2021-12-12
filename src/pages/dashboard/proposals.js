import React from "react";
import Layout from "../../components/dashboard/common/Layout";
import RoleAuthorize from "../../components/dashboard/RoleAuthorize";

export default function Proposals() {
    return (
        <Layout>
            <RoleAuthorize page="proposals"></RoleAuthorize>
        </Layout>
    );
}

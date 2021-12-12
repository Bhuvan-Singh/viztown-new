import React, { useState, useEffect } from "react";
import Layout from "../../../components/dashboard/common/Layout";
import RoleAuthorize from "../../../components/dashboard/RoleAuthorize";
import MeetingsView from "../../../components/dashboard/meetings/MeetingsView";
export default function Meetings() {
    const meetingsDefault = [
        {
            id: 1,
            organizer: "Bhuvan Singh",
            clientName: "Rupin Wadhwa",
            clientEmailId: "rupin@cyberworx.in",
            date: "2021-11-28",
            time: "13:00",
            duration: "60",
            propertyId: 2,
            propertySlug: "signature-project",
            vendorId: 2,
            propertyName: "Signature Project",
            propertyLocation: "101 Indian Road",
            agenda: "Aenean aliquet nisi sit amet vestibulum varius. Cras tempor tempus dui et pharetra. Morbi odio urna, consectetur vel dignissim ac, dapibus at eros. Pellentesque interdum elit vitae nisl interdum luctus a et enim. In in nisi dolor. In rutrum euismod metus non suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
            createDate: "2021-11-24",
        },
        {
            id: 2,
            organizer: "Bhuvan Singh",
            clientName: "Akhshay Nanotiss",
            clientEmailId: "akshay@gmail.in",
            date: "2021-11-25",
            time: "10:00",
            duration: "30",
            propertyId: 2,
            propertySlug: "signature-project",
            vendorId: 2,
            propertyName: "New Rise Apartment",
            propertyLocation: "105 Indian Road",
            agenda: "Aenean aliquet nisi sit amet vestibulum varius. Cras tempor tempus dui et pharetra. Morbi odio urna, consectetur vel dignissim ac, dapibus at eros. Pellentesque interdum elit vitae nisl interdum luctus a et enim. In in nisi dolor. In rutrum euismod metus non suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
            createDate: "2021-11-24",
        },
        {
            id: 3,
            organizer: "Bhuvan Singh",
            clientName: "Naveen Singhss",
            clientEmailId: "naveen@gmail.in",
            date: "2021-11-26",
            time: "18:30",
            duration: "45",
            propertyId: 2,
            propertySlug: "signature-project",
            vendorId: 2,
            propertyName: "Shiv Shakti Heights",
            propertyLocation: "103 Indian Road",
            agenda: "Aenean aliquet nisi sit amet vestibulum varius. Cras tempor tempus dui et pharetra. Morbi odio urna, consectetur vel dignissim ac, dapibus at eros. Pellentesque interdum elit vitae nisl interdum luctus a et enim. In in nisi dolor. In rutrum euismod metus non suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
            createDate: "2021-11-24",
        },
        {
            id: 4,
            organizer: "Bhuvan Singh",
            clientName: "Jatin Shekhar",
            clientEmailId: "jatin@gmail.in",
            date: "2021-11-27",
            time: "11:15",
            duration: "45",
            propertyId: 2,
            propertySlug: "signature-project",
            vendorId: 2,
            propertyName: "Signature Project Again",
            propertyLocation: "Lake bluff, illinios 6000877",
            agenda: "Aenean aliquet nisi sit amet vestibulum varius. Cras tempor tempus dui et pharetra. Morbi odio urna, consectetur vel dignissim ac, dapibus at eros. Pellentesque interdum elit vitae nisl interdum luctus a et enim. In in nisi dolor. In rutrum euismod metus non suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
            createDate: "2021-11-24",
        },
    ];
    const [meetings, setMeetings] = useState(null);

    useEffect(() => {
        setMeetings(meetingsDefault);
    }, []);

    return (
        <Layout>
            <RoleAuthorize page="meetings">
                {meetings !== null ? <MeetingsView meetings={meetings} /> : ""}
            </RoleAuthorize>
        </Layout>
    );
}

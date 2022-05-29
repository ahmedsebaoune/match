import {Link} from "@inertiajs/inertia-react";
import AppLayout from "../layouts/AppLayout";

export default function Home(props) {
    return (<div>
        <Link preserveState href={props.aboutPage} >Click me</Link>
    </div>);
}
Home.layout = page => <AppLayout children={page} />
// Home.layout = page => page;

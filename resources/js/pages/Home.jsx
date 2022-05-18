import { InertiaLink,usePage } from "@inertiajs/inertia-react"
export default function Home()
{

    const { response } = usePage().props
    console.log(response)
    return <div>
        <InertiaLink  href="/Query/Competitions" only={['response']}>
            Query a Competetion
        </InertiaLink>
            
        { response ?
        <pre>
            {response}
        </pre> : "no data"}  
    </div>
    
 }
"use-client"

import Link from "next/link"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import Image from "next/image"
import { useSnapshot } from "valtio"
import state from '@store';
import { useEffect, useState } from "react"





const Nav = () => {

    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);


    useEffect(() => {

        const setUpProviders = async () => {
            const response = await getProviders();
            
            setProviders(response)
        }

        setUpProviders();

    }, [])

    const snap = useSnapshot(state);

  return (
    
    <nav className="flex w-full items-center justify-between p-4">
    <div className="flex-none">

        {/* LOGO NAV */}
        <Link href="/" className="flex items-center gap-2">
            <Image
                src="/unwrapLogoPng.png"
                alt="UnwrapTech"
                width={50}
                height={50}
                priority={true}
                className="rounded-full"
            />
        </Link>
    </div>

    {/* TOP Nav */}
    <div className="flex gap-3 md:gap-5 m-2">
        {session?.user ? (
            <>
                <Link 
                    href="/cart"
                    className="flex items-center gap-2"
                >
                    <Image
                        src="/assets/cart.png"
                        alt="UnwrapTech"
                        width={40}
                        height={40}
                        priority
                        className="rounded-full h-auto w-auto"
                    />
                </Link>
                <button type="button" onClick={signOut} className="outline_btn">
                    Sign Out
                </button>
                <Link href="/profile">
                    <Image
                        src={session?.user.image}
                        alt="Profile-Photo"
                        width={50}
                        height={50}
                        className="rounded-full"
                    />

                </Link>
                 
            </>
        ) : (
            <>
                {providers && 
                Object.values(providers).map((provider => (
                    <button
                        type="button"
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className="black_btn"
                    >
                        Sign In
                    </button>
                )))}
            </>
        )}
    </div>
</nav>

  )
}

export default Nav
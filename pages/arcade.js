import React from 'react'
import { useAccount } from 'wagmi';

export default function arcade() {
    const { address } = useAccount();


    const triggerAracde = async () => {
        // const url = `https://api-v2.arcade.xyz/api/v2/accounts/${address}`;

        // const expiresAt = (Date.now() + 10 * 1000).toString();

        // const res = await fetch(url, {
        //     headers: {
        //         'x-api-key': '8oxZonLw41aVdBqJxvcHE4CbJKmlrX5yQXApYaOOAi0MIBxJi',
        //         'x-expires-at': expiresAt,
        //     },
        // })
        // console.log({ res })

        // const options = {
        //     method: 'GET',
        //     headers: {
        //       accept: 'application/json',
        //       'x-api-key': '8oxZonLw41aVdBqJxvcHE4CbJKmlrX5yQXApYaOOAi0MIBxJi'
        //     }
        //   };

        //   fetch('https://api-v2.arcade.xyz/api/v2/accounts/0xB71C355d2F672C679d13778D41e51de0D291f229', options)
        //     .then(response => response.json())
        //     .then(response => console.log(response))
        //     .catch(err => console.error(err));

        const options = { method: 'GET', headers: { accept: 'application/json'}};

        fetch('https://api-v2.arcade.xyz/api/v2/collections?isVerified=true', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }







    return (
        <>

            <button onClick={triggerAracde}>
                click
            </button>

        </>
    )
}

import { message } from 'antd';
import React from 'react'
import { useAccount } from 'wagmi';


const BASE_URL = 'https://api-v2.arcade.xyz/api/v2'
const GET_LISTING_URL = `${BASE_URL}/lend`
const GET_ACCOUNT_URL = `${BASE_URL}/accounts`
const GET_COLLECTION_URL = `${BASE_URL}/collections`
const API_KEY = '8oxZonLw41aVdBqJxvcHE4CbJKmlrX5yQXApYaOOAi0MIBxJi'

export default function Arcade() {
    const { address } = useAccount();


    const triggerAracde = async () => {
        if (!address) return message.warning('Please connect your wallet first')

        await getAccountDetails();
        await getCollection();
        await getListing();
    }


    const getAccountDetails = async () => {
        const url = `${GET_ACCOUNT_URL}/${address}`

        const expiresAt = (Date.now() + 10 * 1000).toString();

        // TODO: hide api key

        const res = await fetch(url, {
            headers: {
                'x-api-key': API_KEY,
                'x-expires-at': expiresAt,
            },
        })
        const data = await res.json();
        console.log({data})
    }


    const getListing = async () => {
        const url = `${GET_LISTING_URL}`

        const expiresAt = (Date.now() + 10 * 1000).toString();
        const res = await fetch(url, {
            headers: {
                'x-api-key': API_KEY,
                'x-expires-at': expiresAt,
            },
        })
        const data = await res.json();
        console.log({data})




    }

    const getCollection = async () => {
        const url = `${GET_COLLECTION_URL}`

        const expiresAt = (Date.now() + 10 * 1000).toString();
        const res = await fetch(url, {
            headers: {
                'x-api-key': API_KEY,
                'x-expires-at': expiresAt,
            },
        })
        const data = await res.json();
        console.log({data})

    }







    return (
        <>

            <button onClick={triggerAracde}>
                click
            </button>

        </>
    )
}

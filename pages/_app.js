import '../styles/globals.css'
import Link from 'next/link'
import Web3Modal from 'web3modal';
import { useState } from 'react'
import { ethers } from 'ethers';
import '../styles/App.css'

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState(null)

  async function ConnectWallet() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const accounts = await provider.listAccounts();
    const account = accounts[0];
    console.log(account);
    return account;
  }

  async function web3Handler() {
    const account = await ConnectWallet();
    setAccount(account);
  }
  return (
    <div>
      <nav className="border-b p-2">
        
        <div className="flex mt-5">
          
          <Link href="/">
            <p className="mr-6 font-bold ">melomania</p>
          </Link>
          <Link href="/listings">
            <a className="mr-6 text-pink-500">
              View Listings
            </a>
          </Link>
          <Link href="/create-nft">
            <a className="mr-6 text-pink-500">
              Sell Digital Asset
            </a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 text-pink-500">
              My Digital Assets
            </a>
          </Link>
          <Link href="/dashboard">
            <a className="mr-12 text-pink-500">
              Creator Dashboard
            </a>
          </Link>

          
          {account ? (
                <a
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                </a>
            ) : (
                <button onClick={web3Handler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connect Wallet</button>
            )}
          
          
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

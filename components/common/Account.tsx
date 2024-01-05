/** @jsxRuntime classic */
/** @jsx jsx */

import React, { FC, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import { jsx } from '@emotion/react'
import shopifyConfig from '@config/shopify'

interface shopifyConfig {
  apiKey: string;
  apiSecret: string;
}

const config: shopifyConfig = {
  apiKey: process.env.SHOPIFY_API_KEY || '',
  apiSecret: process.env.SHOPIFY_STOREFRONT_API_TOKEN || '',
};

// Function to fetch Shopify configuration data
const accountConfig = async (configKey: string): Promise<shopifyConfig> => {
  // Placeholder for fetching Shopify configuration data
  const response = await fetch(`/api/shopify/config/${configKey}`);
  const data = await response.json();
  return data;
};

// Define the Props interface for the Account component
interface Props {
  className?: string;
  id?: string;
}

// Define the Account component as a Functional Component (FC) with Props
const Account: FC<Props> = () => {
  // Get the router object from Next.js
  const router = useRouter();
  // State variables for managing the component's behavior
  const [isSwitch, setIsSwitch] = useState(false);
  // Toggle between login and sign up forms
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Reference to the button element
  const [accountPageData, setAccountPageData] = useState<shopifyConfig | null>(null);
  // Store data related to the account page


  // Effect hook to fetch data when the route changes
  useEffect(() => {
    const fetchAccountPageData = async () => {
      try {
        // Fetch account page data using the accountConfig function
        const data = await accountConfig('account-page');
        // Set the fetched data and update the switch state
        setAccountPageData(data);
        setIsSwitch(false);
      } catch (error) {
        console.error('Error fetching account page data:', error);
      }
    };

    // Trigger the fetch when the route changes (excluding query parameters)
    fetchAccountPageData();
  }, [router.asPath.split('?')[0]])

  // Function to toggle between login and sign up forms
  const switchTab = () => {
    setIsSwitch(!isSwitch);
  }

  // Render the Account component
  return (
    <>
      {/* Display a welcome message with the user's name */}
      {/* Note: Uncomment the line below when user data is available */}

      {/* <h1>Welcome, {accountPageData?.user?.name}!</h1> */}
      {accountPageData && (
        <h1>Welcome, {accountPageData.user.name}!</h1>
      )}

      {/* Button to toggle between login and sign up forms */}
      <button ref={buttonRef} onClick={switchTab}>
        {isSwitch ? "Log in to your account" : "Create an account"}
      </button>

      {/* Conditional rendering based on the switch state */}
      {isSwitch ? (
        <div>
          {/* Render the login form here */}
        </div>
      ) : (
        <div>
          {/* Render the sign-up form here */}
        </div>
      )}
    </>
  );
}

export default Account;

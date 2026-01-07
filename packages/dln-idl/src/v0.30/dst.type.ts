/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `/dst.json`.
 */
export type DlnDst = {
  "address": "src5qyZHqTqecJV4aY6Cb6zDZLMDzrDKKezs22MPHr4",
  "metadata": {
    "name": "dlnDst",
    "version": "1.2.1",
    "spec": "0.1.0"
  },
  "instructions": [
    {
      "name": "initializeState",
      "discriminator": [
        190,
        171,
        224,
        219,
        217,
        72,
        199,
        176
      ],
      "accounts": [
        {
          "name": "state",
          "writable": true
        },
        {
          "name": "protocolAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "authorizedDstNativeSender",
          "writable": true
        },
        {
          "name": "authorizedDstNativeSenderWallet",
          "writable": true
        },
        {
          "name": "nativeTokenMint"
        },
        {
          "name": "splTokenProgram"
        },
        {
          "name": "associatedSplTokenProgram"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": []
    },
    {
      "name": "reallocState",
      "discriminator": [
        67,
        181,
        233,
        214,
        215,
        148,
        245,
        126
      ],
      "accounts": [
        {
          "name": "state",
          "writable": true
        },
        {
          "name": "protocolAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": []
    },
    {
      "name": "setStopTap",
      "discriminator": [
        80,
        3,
        201,
        203,
        245,
        184,
        51,
        5
      ],
      "accounts": [
        {
          "name": "state",
          "writable": true
        },
        {
          "name": "protocolAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "stopTap",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "setProtocolAuthority",
      "discriminator": [
        96,
        162,
        46,
        152,
        72,
        147,
        175,
        176
      ],
      "accounts": [
        {
          "name": "updateState",
          "accounts": [
            {
              "name": "state",
              "writable": true
            },
            {
              "name": "protocolAuthority",
              "writable": true,
              "signer": true
            },
            {
              "name": "systemProgram"
            }
          ]
        },
        {
          "name": "newProtocolAuthority",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "initializeSrcContractAddress",
      "discriminator": [
        136,
        132,
        246,
        126,
        114,
        104,
        229,
        33
      ],
      "accounts": [
        {
          "name": "state"
        },
        {
          "name": "authorizedSrcContract",
          "writable": true
        },
        {
          "name": "protocolAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "chainId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "srcContract",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "updateSrcContractAddress",
      "discriminator": [
        124,
        255,
        153,
        114,
        38,
        94,
        30,
        185
      ],
      "accounts": [
        {
          "name": "state"
        },
        {
          "name": "authorizedSrcContract",
          "writable": true
        },
        {
          "name": "protocolAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "chainId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "srcContract",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "unpauseSrcContractAddress",
      "discriminator": [
        213,
        159,
        152,
        65,
        153,
        86,
        184,
        100
      ],
      "accounts": [
        {
          "name": "state"
        },
        {
          "name": "authorizedSrcContract",
          "writable": true
        },
        {
          "name": "protocolAuthority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "chainId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "pauseSrcContractAddress",
      "discriminator": [
        5,
        188,
        58,
        214,
        92,
        59,
        215,
        172
      ],
      "accounts": [
        {
          "name": "state"
        },
        {
          "name": "authorizedSrcContract",
          "writable": true
        },
        {
          "name": "stopTap",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "chainId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "cancelOrder",
      "docs": [
        "Send cancel order in [`Order::give.chain_id`]",
        "",
        "If the order was not filled or canceled earlier,",
        "[`Order::order_authority_address_dst`] can cancel it and get back the give part in [`Order::give.chain_id`] chain",
        "In the receive chain, the `dln_src::claim_order_cancel` will be called",
        "",
        "# Args",
        "* `unvalidated_order` - not fulfillied order only for cancel",
        "* `order_id` - identificator of order",
        "",
        "# Allowed",
        "By [`Order::order_authority_address_dst`] only"
      ],
      "discriminator": [
        95,
        129,
        237,
        240,
        8,
        49,
        223,
        132
      ],
      "accounts": [
        {
          "name": "takeOrderState",
          "docs": [
            "Take Order State-Account",
            "Not exists at moment of call, will inititlize in `cancel_order`",
            "Seeds: `[b\"TAKE_ORDER_STATE\", &order_id]`"
          ],
          "writable": true
        },
        {
          "name": "authorizedSrcContract",
          "docs": [
            "Account with address of dln::src contract in [`Order::give.chain_id`] chain",
            "Using here for validate supporting of order give chain and size of addresses",
            "Seeds: `[b\"AUTHORIZED_SRC_CONTRACT\", order.give.chain_id]`"
          ]
        },
        {
          "name": "canceler",
          "docs": [
            "Must be equal to [`Order::order_authority_address_dst`]"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "unvalidatedOrder",
          "type": {
            "defined": {
              "name": "order"
            }
          }
        },
        {
          "name": "orderId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "prepareSend",
      "discriminator": [
        177,
        100,
        244,
        195,
        126,
        99,
        57,
        43
      ],
      "accounts": [
        {
          "name": "takeOrderState"
        },
        {
          "name": "sendFrom",
          "docs": [
            "👤 User Authority"
          ],
          "writable": true
        },
        {
          "name": "sendFromWallet",
          "docs": [
            "👤 User token account from which money is sent"
          ],
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "payerWallet",
          "writable": true
        },
        {
          "name": "chainSupportInfo",
          "docs": [
            "The account that stores support and fee information for a specific chain"
          ]
        },
        {
          "name": "debridgeState"
        },
        {
          "name": "systemProgram",
          "docs": [
            "Solana system program"
          ]
        },
        {
          "name": "splTokenProgram",
          "docs": [
            "System spl token program"
          ]
        },
        {
          "name": "instructions"
        }
      ],
      "args": []
    },
    {
      "name": "fulfillOrder",
      "docs": [
        "Full filled order from other chain",
        "",
        "During the execution of this method, the [`dln_core::Order::take.amount`] of [`Order::take.token_address`] from the `taker` (minus patch amount if [`patch_take_order`] called previously)",
        "will be sent to the [`Order::receiver_dst`]. After that, the `taker` will have the right to call `send_unlock` and receive the [`Order::give`] part in the [`Order::give.chain_id`] chain",
        "",
        "If an [`Order::external_call`] is presented, then this balance will be redirected to a special wallet, for subsequent use within the external call execution",
        "",
        "# Args",
        "* `unvalidated_order` - Full order for fullfill",
        "* `order_id` - identificator of order",
        "",
        "# Allowed",
        "* If [`Order::allowed_taker_dst`] is None then anyone who have [`Order::take.amount`] of [`Order::take.token_mint`] token",
        "* If [`Order::allowed_taker_dst`] is Some then only itself"
      ],
      "discriminator": [
        61,
        214,
        39,
        248,
        65,
        212,
        153,
        36
      ],
      "accounts": [
        {
          "name": "takeOrderState",
          "writable": true
        },
        {
          "name": "taker",
          "writable": true,
          "signer": true
        },
        {
          "name": "takerWallet",
          "writable": true
        },
        {
          "name": "receiverDst",
          "writable": true
        },
        {
          "name": "authorizedSrcContract"
        },
        {
          "name": "takeOrderPatch"
        },
        {
          "name": "splTokenProgram"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "unvalidatedOrder",
          "type": {
            "defined": {
              "name": "order"
            }
          }
        },
        {
          "name": "orderId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "unlockAuthority",
          "type": {
            "option": "pubkey"
          }
        }
      ]
    },
    {
      "name": "patchTakeOrder",
      "discriminator": [
        143,
        123,
        133,
        249,
        52,
        97,
        111,
        114
      ],
      "accounts": [
        {
          "name": "takeOrderPatch",
          "writable": true
        },
        {
          "name": "authorizedSrcContract"
        },
        {
          "name": "patcher",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "unvalidatedOrder",
          "type": {
            "defined": {
              "name": "order"
            }
          }
        },
        {
          "name": "orderId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "newSubtrahend",
          "type": "u64"
        }
      ]
    },
    {
      "name": "sendOrderCancel",
      "discriminator": [
        40,
        200,
        11,
        68,
        214,
        45,
        181,
        172
      ],
      "accounts": [
        {
          "name": "takeOrderState",
          "writable": true
        },
        {
          "name": "canceler",
          "writable": true,
          "signer": true
        },
        {
          "name": "authorizedSrcContract"
        },
        {
          "name": "sending",
          "accounts": [
            {
              "name": "nonceStorage",
              "docs": [
                "The task of this account is to store the Nonce, which is necessary for the uniqueness of each Send",
                "Initialized on the fly, if needed"
              ],
              "writable": true
            },
            {
              "name": "sendFrom",
              "docs": [
                "👤 User Authority"
              ],
              "writable": true
            },
            {
              "name": "sendFromWallet",
              "docs": [
                "👤 User token account from which money is sent"
              ],
              "writable": true
            },
            {
              "name": "systemProgram",
              "docs": [
                "Solana system program"
              ]
            },
            {
              "name": "externalCallStorage",
              "docs": [
                "Storage for unlock\\cancel external call"
              ],
              "writable": true
            },
            {
              "name": "externalCallMeta",
              "docs": [
                "The account that stores information about external call current state.",
                "",
                "It has [`ExternalCallMeta'] structure and is initialized when `submission_params` is not None.",
                "If `submission_params` is None this account is ignored"
              ],
              "writable": true
            },
            {
              "name": "discount",
              "docs": [
                "The account allows the user to get a discount when using the bridge"
              ]
            },
            {
              "name": "bridgeFee",
              "docs": [
                "The account determines whether it is possible to take fix fee from sending tokens",
                "and the percentage of these tokens. Otherwise fix fee in SOL is taken"
              ]
            },
            {
              "name": "bridge",
              "docs": [
                "The account contains all the information about the operation of the bridge",
                "",
                "There are the address of the token with which the bridge works,",
                "the amount of liquidity stored, the collected fee amount and",
                "the settings for the operation of the bridge"
              ],
              "writable": true
            },
            {
              "name": "tokenMint",
              "docs": [
                "The mint account of the token with which the bridge works"
              ],
              "writable": true
            },
            {
              "name": "stakingWallet",
              "docs": [
                "The account stores the user's staking tokens and the fee collected by the bridge in tokens"
              ],
              "writable": true
            },
            {
              "name": "mintAuthority",
              "docs": [
                "The PDA that is the authorization for the transfer of tokens to the user",
                "",
                "It's wrapper token mint authority account for mint bridge,",
                "staking token account owner for send bridge and changing",
                "balance in bridge_data"
              ]
            },
            {
              "name": "chainSupportInfo",
              "docs": [
                "The account that stores support and fee information for a specific chain"
              ]
            },
            {
              "name": "settingsProgram",
              "docs": [
                "Debridge settings  program"
              ]
            },
            {
              "name": "splTokenProgram",
              "docs": [
                "System spl token program"
              ]
            },
            {
              "name": "state",
              "docs": [
                "State account with service information",
                "",
                "This account from settings program is also a unique state for debridge program."
              ],
              "writable": true
            },
            {
              "name": "feeBeneficiary",
              "docs": [
                "Beneficiary of the commission in the system",
                "",
                "The unique value of this account is stored in the state account",
                "Implied that this will be an account belonging to another program (FeeProxy),",
                "which will be responsible for the distribution of commissions"
              ],
              "writable": true
            },
            {
              "name": "debridgeProgram"
            }
          ]
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "cancelBeneficiary",
          "type": "bytes"
        },
        {
          "name": "executionFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "sendUnlock",
      "docs": [
        "Send unlock order in [`Order::give.chain_id`]",
        "",
        "If the order was filled and not unlocked yet, unlock authority from [`OrderState::FullFilled { unlock_authority }`] can unlock it and get the give part in [`Order::give.chain_id`] chain",
        "In the receive chain, the `dln_src::claim_unlock` will be called",
        "",
        "# Args",
        "* `order_id` - identificator of order",
        "* `beneficiary` - Any address in [`Order::take.chain_id`] chain",
        "* `execution_fee` - reward for executor in other chain, for auto-execute `dln_src::claim_unlock`",
        "",
        "# Allowed",
        "By unlock authority stored in [`OrderTakeStatus#variant.Fulfilled`] only"
      ],
      "discriminator": [
        197,
        114,
        196,
        249,
        170,
        75,
        173,
        204
      ],
      "accounts": [
        {
          "name": "takeOrderState",
          "writable": true
        },
        {
          "name": "unlocker",
          "writable": true,
          "signer": true
        },
        {
          "name": "authorizedSrcContract"
        },
        {
          "name": "sending",
          "accounts": [
            {
              "name": "nonceStorage",
              "docs": [
                "The task of this account is to store the Nonce, which is necessary for the uniqueness of each Send",
                "Initialized on the fly, if needed"
              ],
              "writable": true
            },
            {
              "name": "sendFrom",
              "docs": [
                "👤 User Authority"
              ],
              "writable": true
            },
            {
              "name": "sendFromWallet",
              "docs": [
                "👤 User token account from which money is sent"
              ],
              "writable": true
            },
            {
              "name": "systemProgram",
              "docs": [
                "Solana system program"
              ]
            },
            {
              "name": "externalCallStorage",
              "docs": [
                "Storage for unlock\\cancel external call"
              ],
              "writable": true
            },
            {
              "name": "externalCallMeta",
              "docs": [
                "The account that stores information about external call current state.",
                "",
                "It has [`ExternalCallMeta'] structure and is initialized when `submission_params` is not None.",
                "If `submission_params` is None this account is ignored"
              ],
              "writable": true
            },
            {
              "name": "discount",
              "docs": [
                "The account allows the user to get a discount when using the bridge"
              ]
            },
            {
              "name": "bridgeFee",
              "docs": [
                "The account determines whether it is possible to take fix fee from sending tokens",
                "and the percentage of these tokens. Otherwise fix fee in SOL is taken"
              ]
            },
            {
              "name": "bridge",
              "docs": [
                "The account contains all the information about the operation of the bridge",
                "",
                "There are the address of the token with which the bridge works,",
                "the amount of liquidity stored, the collected fee amount and",
                "the settings for the operation of the bridge"
              ],
              "writable": true
            },
            {
              "name": "tokenMint",
              "docs": [
                "The mint account of the token with which the bridge works"
              ],
              "writable": true
            },
            {
              "name": "stakingWallet",
              "docs": [
                "The account stores the user's staking tokens and the fee collected by the bridge in tokens"
              ],
              "writable": true
            },
            {
              "name": "mintAuthority",
              "docs": [
                "The PDA that is the authorization for the transfer of tokens to the user",
                "",
                "It's wrapper token mint authority account for mint bridge,",
                "staking token account owner for send bridge and changing",
                "balance in bridge_data"
              ]
            },
            {
              "name": "chainSupportInfo",
              "docs": [
                "The account that stores support and fee information for a specific chain"
              ]
            },
            {
              "name": "settingsProgram",
              "docs": [
                "Debridge settings  program"
              ]
            },
            {
              "name": "splTokenProgram",
              "docs": [
                "System spl token program"
              ]
            },
            {
              "name": "state",
              "docs": [
                "State account with service information",
                "",
                "This account from settings program is also a unique state for debridge program."
              ],
              "writable": true
            },
            {
              "name": "feeBeneficiary",
              "docs": [
                "Beneficiary of the commission in the system",
                "",
                "The unique value of this account is stored in the state account",
                "Implied that this will be an account belonging to another program (FeeProxy),",
                "which will be responsible for the distribution of commissions"
              ],
              "writable": true
            },
            {
              "name": "debridgeProgram"
            }
          ]
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "beneficiary",
          "type": "bytes"
        },
        {
          "name": "executionFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "sendBatchUnlock",
      "docs": [
        "Send batch unlock order in [`Order::give.chain_id`]",
        "",
        "If the order was filled and not unlocked yet, unlock authority from [`OrderState::FullFilled { unlock_authority }`] can unlock it and get the give part in [`Order::give.chain_id`] chain",
        "In the receive chain, the `dln_src::claim_unlock` will be called",
        "",
        "# Args",
        "* `beneficiary` - Any address in [`Order::take.chain_id`] chain",
        "* `execution_fee` - reward for executor in other chain, for auto-execute `dln_src::claim_unlock`",
        "",
        "# Allowed",
        "By unlock authority stored in [`OrderTakeStatus#variant.Fulfilled`] only"
      ],
      "discriminator": [
        44,
        13,
        156,
        4,
        235,
        38,
        183,
        233
      ],
      "accounts": [
        {
          "name": "unlocker",
          "writable": true,
          "signer": true
        },
        {
          "name": "authorizedSrcContract"
        },
        {
          "name": "sending",
          "accounts": [
            {
              "name": "nonceStorage",
              "docs": [
                "The task of this account is to store the Nonce, which is necessary for the uniqueness of each Send",
                "Initialized on the fly, if needed"
              ],
              "writable": true
            },
            {
              "name": "sendFrom",
              "docs": [
                "👤 User Authority"
              ],
              "writable": true
            },
            {
              "name": "sendFromWallet",
              "docs": [
                "👤 User token account from which money is sent"
              ],
              "writable": true
            },
            {
              "name": "systemProgram",
              "docs": [
                "Solana system program"
              ]
            },
            {
              "name": "externalCallStorage",
              "docs": [
                "Storage for unlock\\cancel external call"
              ],
              "writable": true
            },
            {
              "name": "externalCallMeta",
              "docs": [
                "The account that stores information about external call current state.",
                "",
                "It has [`ExternalCallMeta'] structure and is initialized when `submission_params` is not None.",
                "If `submission_params` is None this account is ignored"
              ],
              "writable": true
            },
            {
              "name": "discount",
              "docs": [
                "The account allows the user to get a discount when using the bridge"
              ]
            },
            {
              "name": "bridgeFee",
              "docs": [
                "The account determines whether it is possible to take fix fee from sending tokens",
                "and the percentage of these tokens. Otherwise fix fee in SOL is taken"
              ]
            },
            {
              "name": "bridge",
              "docs": [
                "The account contains all the information about the operation of the bridge",
                "",
                "There are the address of the token with which the bridge works,",
                "the amount of liquidity stored, the collected fee amount and",
                "the settings for the operation of the bridge"
              ],
              "writable": true
            },
            {
              "name": "tokenMint",
              "docs": [
                "The mint account of the token with which the bridge works"
              ],
              "writable": true
            },
            {
              "name": "stakingWallet",
              "docs": [
                "The account stores the user's staking tokens and the fee collected by the bridge in tokens"
              ],
              "writable": true
            },
            {
              "name": "mintAuthority",
              "docs": [
                "The PDA that is the authorization for the transfer of tokens to the user",
                "",
                "It's wrapper token mint authority account for mint bridge,",
                "staking token account owner for send bridge and changing",
                "balance in bridge_data"
              ]
            },
            {
              "name": "chainSupportInfo",
              "docs": [
                "The account that stores support and fee information for a specific chain"
              ]
            },
            {
              "name": "settingsProgram",
              "docs": [
                "Debridge settings  program"
              ]
            },
            {
              "name": "splTokenProgram",
              "docs": [
                "System spl token program"
              ]
            },
            {
              "name": "state",
              "docs": [
                "State account with service information",
                "",
                "This account from settings program is also a unique state for debridge program."
              ],
              "writable": true
            },
            {
              "name": "feeBeneficiary",
              "docs": [
                "Beneficiary of the commission in the system",
                "",
                "The unique value of this account is stored in the state account",
                "Implied that this will be an account belonging to another program (FeeProxy),",
                "which will be responsible for the distribution of commissions"
              ],
              "writable": true
            },
            {
              "name": "debridgeProgram"
            }
          ]
        }
      ],
      "args": [
        {
          "name": "beneficiary",
          "type": "bytes"
        },
        {
          "name": "executionFee",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "takeOrderPatch",
      "discriminator": [
        138,
        112,
        38,
        132,
        187,
        6,
        169,
        235
      ]
    },
    {
      "name": "authorizedSrcContract",
      "discriminator": [
        53,
        68,
        38,
        179,
        142,
        197,
        150,
        197
      ]
    },
    {
      "name": "takeOrderState",
      "discriminator": [
        147,
        214,
        97,
        159,
        59,
        67,
        236,
        166
      ]
    },
    {
      "name": "state",
      "discriminator": [
        146,
        10,
        19,
        112,
        191,
        43,
        175,
        106
      ]
    }
  ],
  "events": [
    {
      "name": "stateInitialized",
      "discriminator": [
        87,
        122,
        98,
        236,
        219,
        55,
        5,
        98
      ]
    },
    {
      "name": "fulfilled",
      "discriminator": [
        210,
        174,
        131,
        213,
        40,
        182,
        83,
        110
      ]
    },
    {
      "name": "sentUnlock",
      "discriminator": [
        80,
        95,
        27,
        102,
        221,
        162,
        177,
        24
      ]
    },
    {
      "name": "sentOrderCancel",
      "discriminator": [
        78,
        205,
        115,
        248,
        199,
        138,
        234,
        42
      ]
    },
    {
      "name": "orderCancelled",
      "discriminator": [
        108,
        56,
        128,
        68,
        168,
        113,
        168,
        239
      ]
    },
    {
      "name": "decreaseTakeAmount",
      "discriminator": [
        7,
        219,
        41,
        79,
        233,
        63,
        20,
        0
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "wrongAmount"
    },
    {
      "code": 6001,
      "name": "wrongBeneficiarySize"
    },
    {
      "code": 6002,
      "name": "wrongChainId"
    },
    {
      "code": 6003,
      "name": "wrongMint"
    },
    {
      "code": 6004,
      "name": "wrongOrderId"
    },
    {
      "code": 6005,
      "name": "wrongPrepareSendNextIxDiscriminator"
    },
    {
      "code": 6006,
      "name": "wrongPrepareSendNextIxProgramId"
    },
    {
      "code": 6007,
      "name": "wrongReceiverWalletOwner"
    },
    {
      "code": 6008,
      "name": "wrongTakerAta"
    },
    {
      "code": 6009,
      "name": "wrongReceiverAta"
    },
    {
      "code": 6010,
      "name": "wrongTakeTokenAddress"
    },
    {
      "code": 6011,
      "name": "wrongNativeTaker"
    },
    {
      "code": 6012,
      "name": "wrongNativeDst"
    },
    {
      "code": 6013,
      "name": "wrongTakeOrderPatch"
    },
    {
      "code": 6014,
      "name": "wrongAuthorizedSrcContract"
    },
    {
      "code": 6015,
      "name": "calculationOrderIdError"
    },
    {
      "code": 6016,
      "name": "unlockNotAllowed"
    },
    {
      "code": 6017,
      "name": "fixedFeeCalculationError"
    },
    {
      "code": 6018,
      "name": "notAllowedEmptyBatch"
    },
    {
      "code": 6019,
      "name": "notAllowedCancelBeneficiary"
    },
    {
      "code": 6020,
      "name": "notAllowedTaker"
    },
    {
      "code": 6021,
      "name": "invalidAllowedCancelBeneficiarySrcSize"
    },
    {
      "code": 6022,
      "name": "invalidMakerSrcSize"
    },
    {
      "code": 6023,
      "name": "invalidGivePatchAuthoritySrcSize"
    },
    {
      "code": 6024,
      "name": "invalidReceiverDstSize"
    },
    {
      "code": 6025,
      "name": "invalidOrderAuthorityDstSize"
    },
    {
      "code": 6026,
      "name": "invalidAllowedTakerDst"
    },
    {
      "code": 6027,
      "name": "invalidTakeOfferAmount"
    },
    {
      "code": 6028,
      "name": "matchOverflowWhileCalculateInputAmount"
    },
    {
      "code": 6029,
      "name": "overflowWhileApplyTakeOrderPatch"
    },
    {
      "code": 6030,
      "name": "chainPaused"
    },
    {
      "code": 6031,
      "name": "wrongSigner"
    },
    {
      "code": 6032,
      "name": "reallocNotNeeded"
    },
    {
      "code": 6033,
      "name": "overflowError"
    }
  ],
  "types": [
    {
      "name": "order",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "makerOrderNonce",
            "docs": [
              "Unique nonce number for each maker",
              "Together with the maker, it forms the uniqueness for the order,",
              "which is important for calculating the order id"
            ],
            "type": "u64"
          },
          {
            "name": "makerSrc",
            "docs": [
              "Order maker address",
              "Address in source chain"
            ],
            "type": "bytes"
          },
          {
            "name": "give",
            "docs": [
              "Offer given on source chain"
            ],
            "type": {
              "defined": {
                "name": "offer"
              }
            }
          },
          {
            "name": "take",
            "docs": [
              "Offer to take in destination chain"
            ],
            "type": {
              "defined": {
                "name": "offer"
              }
            }
          },
          {
            "name": "receiverDst",
            "docs": [
              "Address in dst chain",
              "Address of receiver_dst of tokens in target chain",
              "or",
              "address of external call executor if `external_call` presented"
            ],
            "type": "bytes"
          },
          {
            "name": "givePatchAuthoritySrc",
            "docs": [
              "Address in source chain",
              "Can `patch_order_give`"
            ],
            "type": "bytes"
          },
          {
            "name": "orderAuthorityAddressDst",
            "docs": [
              "Address in destination chain",
              "Can `send_order_cancel`, `process_fallback` and `patch_order_take`"
            ],
            "type": "bytes"
          },
          {
            "name": "allowedTakerDst",
            "docs": [
              "Address in destination chain",
              "If the field is `Some`, then only this address can call `full_fill_order` with this",
              "order"
            ],
            "type": {
              "option": "bytes"
            }
          },
          {
            "name": "allowedCancelBeneficiarySrc",
            "docs": [
              "Address in source chain",
              "If the field is `Some`, then only this address can receive cancel"
            ],
            "type": {
              "option": "bytes"
            }
          },
          {
            "name": "externalCall",
            "docs": [
              "External call for automatically execution in target chain after execution of order"
            ],
            "type": {
              "option": {
                "defined": {
                  "name": "externalCallParams"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "externalCallParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "externalCallShortcut",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "offer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "chainId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenAddress",
            "type": "bytes"
          },
          {
            "name": "amount",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "evmClaimInstruction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "claimOrderCancel"
          },
          {
            "name": "claimUnlock"
          }
        ]
      }
    },
    {
      "name": "evmClaimBatchInstruction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "claimBatchUnlock"
          }
        ]
      }
    },
    {
      "name": "orderTakeStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "oldFulfilled",
            "fields": [
              {
                "name": "unlockAuthority",
                "type": "pubkey"
              }
            ]
          },
          {
            "name": "sentUnlock",
            "fields": [
              {
                "name": "unlocker",
                "type": "pubkey"
              }
            ]
          },
          {
            "name": "cancelled",
            "fields": [
              {
                "name": "canceler",
                "type": "pubkey"
              },
              {
                "name": "allowedCancelBeneficiarySrc",
                "type": {
                  "option": "bytes"
                }
              }
            ]
          },
          {
            "name": "sentCancel",
            "fields": [
              {
                "name": "canceler",
                "type": "pubkey"
              }
            ]
          },
          {
            "name": "fulfilled",
            "fields": [
              {
                "name": "unlockAuthority",
                "type": "pubkey"
              },
              {
                "name": "orderId",
                "type": {
                  "array": [
                    "u8",
                    32
                  ]
                }
              }
            ]
          }
        ]
      }
    },
    {
      "name": "takeOrderPatch",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "orderTakeFinalAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "authorizedSrcContract",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "srcContract",
            "type": "bytes"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "isWorking",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "takeOrderState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "orderState",
            "type": {
              "defined": {
                "name": "orderTakeStatus"
              }
            }
          },
          {
            "name": "sourceChainId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "protocolAuthority",
            "type": "pubkey"
          },
          {
            "name": "stopTap",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "stateInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "protocolAuthority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "fulfilled",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "orderId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "taker",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "sentUnlock",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "sentOrderCancel",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "orderCancelled",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "decreaseTakeAmount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "orderId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "orderTakeFinalAmount",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

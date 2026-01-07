/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `/src.json`.
 */
export type DlnSrc = {
  "address": "src5qyZHqTqecJV4aY6Cb6zDZLMDzrDKKezs22MPHr4",
  "metadata": {
    "name": "dlnSrc",
    "version": "3.0.0",
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
          "docs": [
            "State account with service information",
            "There is a single state account for the entire program"
          ],
          "writable": true
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "feeLedger",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "newState",
          "type": {
            "defined": {
              "name": "newState"
            }
          }
        }
      ]
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
      "name": "setFixedFee",
      "discriminator": [
        238,
        14,
        137,
        181,
        156,
        157,
        55,
        27
      ],
      "accounts": [
        {
          "name": "state",
          "docs": [
            "State account with service information",
            "There is a single state account for the entire program"
          ],
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
          "name": "fixedFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setPercentFeeBps",
      "discriminator": [
        115,
        39,
        161,
        77,
        175,
        252,
        152,
        141
      ],
      "accounts": [
        {
          "name": "state",
          "docs": [
            "State account with service information",
            "There is a single state account for the entire program"
          ],
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
          "name": "percentFeeBps",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setIsFeeRefund",
      "discriminator": [
        127,
        239,
        175,
        39,
        72,
        244,
        47,
        33
      ],
      "accounts": [
        {
          "name": "state",
          "docs": [
            "State account with service information",
            "There is a single state account for the entire program"
          ],
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
          "name": "isFeeRefund",
          "type": "bool"
        }
      ]
    },
    {
      "name": "setFeeBeneficiry",
      "discriminator": [
        35,
        243,
        194,
        253,
        151,
        40,
        229,
        251
      ],
      "accounts": [
        {
          "name": "state",
          "docs": [
            "State account with service information",
            "There is a single state account for the entire program"
          ],
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
          "name": "feeBeneficiary",
          "type": "pubkey"
        }
      ]
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
          "docs": [
            "State account with service information",
            "There is a single state account for the entire program"
          ],
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
              "docs": [
                "State account with service information",
                "There is a single state account for the entire program"
              ],
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
      "name": "pauseState",
      "discriminator": [
        44,
        86,
        151,
        21,
        158,
        185,
        8,
        36
      ],
      "accounts": [
        {
          "name": "state",
          "docs": [
            "State account with service information",
            "There is a single state account for the entire program"
          ],
          "writable": true
        },
        {
          "name": "stopTap",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "unpauseState",
      "discriminator": [
        133,
        243,
        138,
        167,
        154,
        215,
        251,
        167
      ],
      "accounts": [
        {
          "name": "state",
          "docs": [
            "State account with service information",
            "There is a single state account for the entire program"
          ],
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
      "name": "updateAuthorizedNativeSender",
      "discriminator": [
        213,
        75,
        181,
        116,
        29,
        225,
        125,
        209
      ],
      "accounts": [
        {
          "name": "state",
          "docs": [
            "State account with service information",
            "There is a single state account for the entire program"
          ]
        },
        {
          "name": "protocolAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "authorizedNativeSender",
          "writable": true
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
          "name": "newAuthorizedNativeSender",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "createOrder",
      "docs": [
        "Create new order for dln system",
        "",
        "# Args",
        "* `order_args` - Input parameters for new order",
        "* `affiliate_fee` - Additional optional commission charged by integrators of DLN",
        "* `referral_code` - referral code, if Some then used in event",
        "",
        "# Allowed",
        "Anyone who have [`CreateOrderArgs::give_original_amount`] of [`CreatingOrder::token_mint`] token"
      ],
      "discriminator": [
        141,
        54,
        37,
        207,
        237,
        210,
        250,
        215
      ],
      "accounts": [
        {
          "name": "maker",
          "writable": true,
          "signer": true
        },
        {
          "name": "state"
        },
        {
          "name": "tokenMint"
        },
        {
          "name": "giveOrderState",
          "docs": [
            "Account with GiveOrderState",
            "seeds = [GiveOrderState::SEED, &order_id.to_bytes()],",
            "Will be initialized inside [`create_order`]"
          ],
          "writable": true
        },
        {
          "name": "authorizedNativeSender"
        },
        {
          "name": "makerWallet",
          "writable": true
        },
        {
          "name": "giveOrderWallet",
          "docs": [
            "Wallet of `give_order_state`",
            "Will be initialized inside [`create_order`]"
          ],
          "writable": true
        },
        {
          "name": "nonceMaster",
          "writable": true
        },
        {
          "name": "feeLedgerWallet",
          "writable": true
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "splTokenProgram"
        },
        {
          "name": "associatedSplTokenProgram"
        }
      ],
      "args": [
        {
          "name": "orderArgs",
          "type": {
            "defined": {
              "name": "createOrderArgs"
            }
          }
        },
        {
          "name": "affiliateFee",
          "type": {
            "option": {
              "defined": {
                "name": "affiliateFee"
              }
            }
          }
        },
        {
          "name": "referralCode",
          "type": {
            "option": "u32"
          }
        }
      ]
    },
    {
      "name": "createOrderWithNonce",
      "docs": [
        "Create new order for dln system",
        "",
        "# Args",
        "* `order_args` - Input parameters for new order",
        "* `affiliate_fee` - Additional optional commission charged by integrators of DLN",
        "* `referral_code` - referral code, if Some then used in event",
        "* `nonce` - salt to make the order unique",
        "",
        "# Allowed",
        "Anyone who have [`CreateOrderArgs::give_original_amount`] of [`CreatingOrder::token_mint`] token"
      ],
      "discriminator": [
        130,
        131,
        98,
        190,
        40,
        206,
        68,
        50
      ],
      "accounts": [
        {
          "name": "maker",
          "writable": true,
          "signer": true
        },
        {
          "name": "state"
        },
        {
          "name": "tokenMint"
        },
        {
          "name": "giveOrderState",
          "docs": [
            "Account with GiveOrderState",
            "seeds = [GiveOrderState::SEED, &order_id.to_bytes()],",
            "Will be initialized inside [`create_order`]"
          ],
          "writable": true
        },
        {
          "name": "authorizedNativeSender"
        },
        {
          "name": "makerWallet",
          "writable": true
        },
        {
          "name": "giveOrderWallet",
          "docs": [
            "Wallet of `give_order_state`",
            "Will be initialized inside [`create_order`]"
          ],
          "writable": true
        },
        {
          "name": "nonceMaster",
          "writable": true
        },
        {
          "name": "feeLedgerWallet",
          "writable": true
        },
        {
          "name": "systemProgram"
        },
        {
          "name": "splTokenProgram"
        },
        {
          "name": "associatedSplTokenProgram"
        }
      ],
      "args": [
        {
          "name": "orderArgs",
          "type": {
            "defined": {
              "name": "createOrderArgs"
            }
          }
        },
        {
          "name": "affiliateFee",
          "type": {
            "option": {
              "defined": {
                "name": "affiliateFee"
              }
            }
          }
        },
        {
          "name": "referralCode",
          "type": {
            "option": "u32"
          }
        },
        {
          "name": "nonce",
          "type": "u64"
        },
        {
          "name": "metadata",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "patchOrderGive",
      "discriminator": [
        64,
        188,
        129,
        255,
        64,
        129,
        139,
        102
      ],
      "accounts": [
        {
          "name": "giveOrderState",
          "writable": true
        },
        {
          "name": "giveOrderWallet",
          "writable": true
        },
        {
          "name": "givePatchAuthority",
          "signer": true
        },
        {
          "name": "givePatchAuthorityWallet",
          "writable": true
        },
        {
          "name": "state"
        },
        {
          "name": "splTokenProgram"
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
          "name": "inputAdditionToGiveAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimUnlock",
      "docs": [
        "Claim unlock from order take chain",
        "Implying that the order was fulfilled and sent unlock by taker from [`OrderState::FullFilled { taker }`]",
        "",
        "# Args",
        "* `order_id` - order id for claim",
        "",
        "# Allowed",
        "Only debridge external call executor with debridge transaction in source chain from taker of order"
      ],
      "discriminator": [
        89,
        81,
        180,
        79,
        142,
        144,
        66,
        251
      ],
      "accounts": [
        {
          "name": "submission",
          "docs": [
            "0"
          ]
        },
        {
          "name": "submissionAuthority",
          "docs": [
            "1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "state",
          "docs": [
            "2",
            "State account with service information",
            "There is a single state account for the entire program"
          ],
          "writable": true
        },
        {
          "name": "feeLedger",
          "docs": [
            "3"
          ],
          "writable": true
        },
        {
          "name": "feeLedgerWallet",
          "docs": [
            "4"
          ],
          "writable": true
        },
        {
          "name": "instructions",
          "docs": [
            "5"
          ]
        },
        {
          "name": "giveOrderState",
          "docs": [
            "6"
          ],
          "writable": true
        },
        {
          "name": "actionBeneficiaryWallet",
          "docs": [
            "Action beneficiary ATA",
            "If empty, then automatically initialized ATA (determined based on [`AccountInfo::owner`])"
          ],
          "writable": true
        },
        {
          "name": "actionBeneficiary",
          "docs": [
            "8"
          ],
          "writable": true
        },
        {
          "name": "giveOrderWallet",
          "docs": [
            "9"
          ],
          "writable": true
        },
        {
          "name": "tokenMint",
          "docs": [
            "10"
          ]
        },
        {
          "name": "authorizedNativeSender",
          "docs": [
            "11"
          ]
        },
        {
          "name": "splTokenProgram",
          "docs": [
            "12"
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
        }
      ]
    },
    {
      "name": "claimOrderCancel",
      "docs": [
        "Claim cancel from order take chain",
        "Implying that the order was not fulfilled and sent canceled by [`Order::order_authority_address_dst`]",
        "",
        "# Args",
        "* `order_id` - order id for claim",
        "",
        "# Allowed",
        "Only debridge external call executor with debridge transaction in source chain from [`Order::order_authority_address_dst`]"
      ],
      "discriminator": [
        19,
        97,
        126,
        238,
        204,
        141,
        69,
        76
      ],
      "accounts": [
        {
          "name": "submission",
          "docs": [
            "0"
          ]
        },
        {
          "name": "submissionAuthority",
          "docs": [
            "1"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "state",
          "docs": [
            "2",
            "State account with service information",
            "There is a single state account for the entire program"
          ],
          "writable": true
        },
        {
          "name": "feeLedger",
          "docs": [
            "3"
          ],
          "writable": true
        },
        {
          "name": "feeLedgerWallet",
          "docs": [
            "4"
          ],
          "writable": true
        },
        {
          "name": "instructions",
          "docs": [
            "5"
          ]
        },
        {
          "name": "giveOrderState",
          "docs": [
            "6"
          ],
          "writable": true
        },
        {
          "name": "actionBeneficiaryWallet",
          "docs": [
            "Action beneficiary ATA",
            "If empty, then automatically initialized ATA (determined based on [`AccountInfo::owner`])"
          ],
          "writable": true
        },
        {
          "name": "actionBeneficiary",
          "docs": [
            "8"
          ],
          "writable": true
        },
        {
          "name": "giveOrderWallet",
          "docs": [
            "9"
          ],
          "writable": true
        },
        {
          "name": "tokenMint",
          "docs": [
            "10"
          ]
        },
        {
          "name": "authorizedNativeSender",
          "docs": [
            "11"
          ]
        },
        {
          "name": "splTokenProgram",
          "docs": [
            "12"
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
        }
      ]
    },
    {
      "name": "withdrawFixFee",
      "discriminator": [
        24,
        156,
        23,
        253,
        46,
        76,
        247,
        202
      ],
      "accounts": [
        {
          "name": "state"
        },
        {
          "name": "feeLedger",
          "writable": true
        },
        {
          "name": "feeBeneficiary",
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
      "name": "withdrawPercentFee",
      "discriminator": [
        50,
        219,
        95,
        73,
        93,
        162,
        245,
        14
      ],
      "accounts": [
        {
          "name": "withdrawFee",
          "accounts": [
            {
              "name": "state"
            },
            {
              "name": "feeLedger",
              "writable": true
            },
            {
              "name": "feeBeneficiary",
              "writable": true,
              "signer": true
            },
            {
              "name": "systemProgram"
            }
          ]
        },
        {
          "name": "feeLedgerWallet",
          "writable": true
        },
        {
          "name": "feeBeneficiaryWallet",
          "writable": true
        },
        {
          "name": "tokenMint"
        },
        {
          "name": "splTokenProgram"
        }
      ],
      "args": []
    },
    {
      "name": "withdrawAffiliateFee",
      "discriminator": [
        143,
        79,
        158,
        208,
        125,
        51,
        86,
        85
      ],
      "accounts": [
        {
          "name": "affiliateFeeBeneficiary",
          "signer": true
        },
        {
          "name": "affiliateFeeWallet",
          "writable": true
        },
        {
          "name": "giveOrderState",
          "writable": true
        },
        {
          "name": "giveOrderWallet",
          "writable": true
        },
        {
          "name": "splTokenProgram"
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
        }
      ]
    }
  ],
  "accounts": [
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
    },
    {
      "name": "giveOrderState",
      "discriminator": [
        62,
        200,
        109,
        228,
        254,
        27,
        147,
        148
      ]
    },
    {
      "name": "nonceMaster",
      "discriminator": [
        253,
        24,
        171,
        44,
        200,
        204,
        206,
        81
      ]
    },
    {
      "name": "authorizedNativeSender",
      "discriminator": [
        253,
        238,
        80,
        139,
        23,
        160,
        35,
        15
      ]
    }
  ],
  "events": [
    {
      "name": "createdOrder",
      "discriminator": [
        106,
        87,
        74,
        230,
        32,
        120,
        71,
        210
      ]
    },
    {
      "name": "createdOrderId",
      "discriminator": [
        187,
        41,
        27,
        73,
        12,
        63,
        13,
        84
      ]
    },
    {
      "name": "claimedOrderCancel",
      "discriminator": [
        98,
        176,
        8,
        102,
        211,
        245,
        60,
        182
      ]
    },
    {
      "name": "claimedUnlock",
      "discriminator": [
        200,
        45,
        167,
        251,
        49,
        232,
        91,
        13
      ]
    },
    {
      "name": "increasedGiveAmount",
      "discriminator": [
        6,
        189,
        113,
        78,
        139,
        50,
        136,
        69
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "giveOrderStateWrongPubkey",
      "msg": "Order state-account have wrong pubkey. Perhaps you miscalculated order_id."
    },
    {
      "code": 6001,
      "name": "giveOrderStateWrongStatus",
      "msg": "Order state-account have wrong status, for this action."
    },
    {
      "code": 6002,
      "name": "giveOrderWalletWrongPubkey",
      "msg": "Order wallet-account have wrong pubkey. Perhaps you miscalculated order_id."
    },
    {
      "code": 6003,
      "name": "calculationOrderIdError",
      "msg": "Can't calculate order id. Wrong input arguments."
    },
    {
      "code": 6004,
      "name": "overflowError",
      "msg": "Incoming data resulted in match-overflow error."
    },
    {
      "code": 6005,
      "name": "orderAlreadyProcessed",
      "msg": "Order already processed. Can't do this action."
    },
    {
      "code": 6006,
      "name": "wrongPatchAmount",
      "msg": "Too little patch for give amount. Please add more"
    },
    {
      "code": 6007,
      "name": "wrongClaimParentProgramId",
      "msg": "Wrong parent ix program id. This method must be called by debridge program in execute_external call"
    },
    {
      "code": 6008,
      "name": "wrongClaimParentInstruction",
      "msg": "Wrong parent ix. This method must be called by debridge program in execute_external call"
    },
    {
      "code": 6009,
      "name": "wrongClaimParentInstructionAccounts",
      "msg": "Wrong parent ix accounts. This method must be called by debridge program in execute_external call"
    },
    {
      "code": 6010,
      "name": "wrongClaimParentSubmission",
      "msg": "Wrong parent ix submission. This method must be called by debridge program in execute_external call"
    },
    {
      "code": 6011,
      "name": "wrongClaimParentSubmissionAuth",
      "msg": "Wrong parent debridge-submission authority. This method must be called by debridge program in execute_external call"
    },
    {
      "code": 6012,
      "name": "wrongClaimParentNativeSender",
      "msg": "Wrong parent debridge-submission native sender. This method must be called by debridge program in execute_external call"
    },
    {
      "code": 6013,
      "name": "wrongClaimParentSourceChain",
      "msg": "Wrong parent debridge-submission source chain. This method must be called by debridge program in execute_external call"
    },
    {
      "code": 6014,
      "name": "badReceiverDstSize",
      "msg": "Wrong size of receiver address for this chain"
    },
    {
      "code": 6015,
      "name": "badOrderAuthorityDstSize",
      "msg": "Wrong size of order authority address for this chain"
    },
    {
      "code": 6016,
      "name": "badAllowedTakerDst",
      "msg": "Wrong size of allowed taker address for this chain"
    },
    {
      "code": 6017,
      "name": "badFallbackAddressDstSize",
      "msg": "Wrong size of fallback address address for this chain"
    },
    {
      "code": 6018,
      "name": "affiliateFeeNotReadyToPay",
      "msg": "Affiliate fee already paid or not exists"
    },
    {
      "code": 6019,
      "name": "fixFeeAlreadyPaid",
      "msg": "Fix fee already paid"
    },
    {
      "code": 6020,
      "name": "percentFeeAlreadyPaid",
      "msg": "Percent fee already paid"
    },
    {
      "code": 6021,
      "name": "externalCallDisables",
      "msg": "Orders with external call not allowed right now"
    },
    {
      "code": 6022,
      "name": "feeLedgerWalletWrongKey",
      "msg": "Fee ledger wallet pubkey miscalculated"
    },
    {
      "code": 6023,
      "name": "notAllowedCancelBeneficiary",
      "msg": "Cancel beneficiary not allowed, use cancel-beneficiary from order state-account"
    },
    {
      "code": 6024,
      "name": "statePaused",
      "msg": "The action cannot be continued, the program-state is on pause"
    },
    {
      "code": 6025,
      "name": "stateWorking",
      "msg": "Can't unpause because the program is already running"
    },
    {
      "code": 6026,
      "name": "wrongSigner",
      "msg": "Wrong signer for realloc"
    },
    {
      "code": 6027,
      "name": "reallocNotNeeded",
      "msg": "Realloc not needed, new space equal to old one"
    },
    {
      "code": 6028,
      "name": "wrongExtcallIdError",
      "msg": "Failed to parse extcall program id from receiver_dst field."
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
      "name": "newState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fixedFee",
            "docs": [
              "Fixed fee in native chain tokes"
            ],
            "type": "u64"
          },
          {
            "name": "percentFeeBps",
            "docs": [
              "Fee as bps of process amount"
            ],
            "type": "u64"
          },
          {
            "name": "isFeeRefund",
            "docs": [
              "If true in `claim_order_cancel` we return fix fee back to maker"
            ],
            "type": "bool"
          },
          {
            "name": "feeBeneficiary",
            "docs": [
              "Address for transfers fees"
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "affiliateFee",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "beneficiary",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "createOrderArgs",
      "docs": [
        "Structure for forming a new order"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "giveOriginalAmount",
            "docs": [
              "Input amount for `create order` call, that will be transferred from the user's wallet.",
              "The dln commissions will be deducted from it and the resulting value will be used as [`Order::give.amount`]"
            ],
            "type": "u64"
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
            "name": "externalCall",
            "docs": [
              "External call for automatically execution in target chain after execution of order"
            ],
            "type": {
              "option": "bytes"
            }
          },
          {
            "name": "givePatchAuthoritySrc",
            "docs": [
              "Address in source chain",
              "Can call `patch_order_give` method of src program"
            ],
            "type": "pubkey"
          },
          {
            "name": "allowedCancelBeneficiarySrc",
            "docs": [
              "Address in source chain",
              "If the field is `Some`, then only this address can receive cancel"
            ],
            "type": {
              "option": "pubkey"
            }
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
              "If the field is `Some`, then only this address can call `fulfill_order` with this",
              "order"
            ],
            "type": {
              "option": "bytes"
            }
          }
        ]
      }
    },
    {
      "name": "giveOrderStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "created",
            "fields": [
              {
                "name": "giveAmount",
                "type": {
                  "option": "u64"
                }
              },
              {
                "name": "fixFee",
                "type": {
                  "option": "u64"
                }
              },
              {
                "name": "percentFee",
                "type": {
                  "option": "u64"
                }
              },
              {
                "name": "affiliateFee",
                "type": {
                  "option": {
                    "defined": {
                      "name": "affiliateFee"
                    }
                  }
                }
              },
              {
                "name": "allowedCancelBeneficiary",
                "type": {
                  "option": "pubkey"
                }
              },
              {
                "name": "givePatchAuthority",
                "type": "pubkey"
              },
              {
                "name": "takeChainId",
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
            "name": "claimedUnlock",
            "fields": [
              {
                "name": "affiliateFee",
                "type": {
                  "option": {
                    "defined": {
                      "name": "affiliateFee"
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "claimedCancel",
            "fields": [
              {
                "name": "affiliateFee",
                "type": {
                  "option": {
                    "defined": {
                      "name": "affiliateFee"
                    }
                  }
                }
              }
            ]
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
            "name": "fixedFee",
            "docs": [
              "Fixed fee in native chain tokes"
            ],
            "type": "u64"
          },
          {
            "name": "percentFeeBps",
            "docs": [
              "Fee as bps of process amount"
            ],
            "type": "u64"
          },
          {
            "name": "isFeeRefund",
            "docs": [
              "If true in `claim_order_cancel` we return all fix fee back to maker"
            ],
            "type": "bool"
          },
          {
            "name": "feeBeneficiary",
            "docs": [
              "Address for transfers fees"
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "Bump from pubkey of `State` account"
            ],
            "type": "u8"
          },
          {
            "name": "stopTap",
            "docs": [
              "Pubkey for pause program"
            ],
            "type": "pubkey"
          },
          {
            "name": "isWorking",
            "docs": [
              "Is protocol working right now"
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "giveOrderState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "giveOrderStatus"
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "walletBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "nonceMaster",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nonce",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "authorizedNativeSender",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "dstAddress",
            "type": "bytes"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "createdOrder",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "order",
            "type": {
              "defined": {
                "name": "order"
              }
            }
          },
          {
            "name": "fixFee",
            "type": "u64"
          },
          {
            "name": "percentFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "createdOrderId",
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
          }
        ]
      }
    },
    {
      "name": "claimedOrderCancel",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "claimedUnlock",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "increasedGiveAmount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "orderGiveFinalAmount",
            "type": "u64"
          },
          {
            "name": "finalPercentFee",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

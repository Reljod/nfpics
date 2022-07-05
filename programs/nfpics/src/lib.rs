use {
    anchor_lang::{
        prelude::*,
        solana_program::program::invoke,
        system_program,
    },
    anchor_spl::{
        associated_token,
        token,
    },
    mpl_token_metadata::{
        ID as TOKEN_METADATA_ID,
        instruction as token_instruction,
    },
};

declare_id!("33dzo1WrFP7udfrHBxkEGDzrTFj3F2w1cMePKjNtsWnr");

#[program]
pub mod nfpics {
    use super::*;

    pub fn mint_nft(
        ctx: Context<MintNft>, 
        metadata_name: String, 
        metadata_symbol: String, 
        metadata_uri: String
    ) -> Result<()> {

        msg!("Creating mint account...");
        system_program::create_account(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(), 
                system_program::CreateAccount { 
                    from: ctx.accounts.mint_authority.to_account_info(), 
                    to: ctx.accounts.mint.to_account_info() 
                }
            ), 10000000,
            82, 
            &ctx.accounts.token_program.key()
        )?;

        msg!("Initializing mint account...");
        token::initialize_mint(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::InitializeMint {
                    mint: ctx.accounts.mint.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info()
                }
            ), 0,
            &ctx.accounts.mint_authority.key(),
            Some(&ctx.accounts.mint_authority.key())
        )?;

        msg!("Creating token account...");
        associated_token::create(
            CpiContext::new(
                ctx.accounts.associated_token_program.to_account_info(),
                associated_token::Create {
                    payer: ctx.accounts.mint_authority.to_account_info(),
                    associated_token: ctx.accounts.token_account.to_account_info(),
                    authority: ctx.accounts.mint_authority.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                    system_program: ctx.accounts.system_program.to_account_info(),
                    token_program: ctx.accounts.token_program.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                }
            )
        )?;

        token::mint_to(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.token_account.to_account_info(),
                    authority: ctx.accounts.mint_authority.to_account_info(),
                },
            ),
            1,
        )?;

        msg!("Creating metadata account...");
        invoke(
            &token_instruction::create_metadata_accounts(
                TOKEN_METADATA_ID, 
                ctx.accounts.metadata.key(),
                ctx.accounts.mint.key(),
                ctx.accounts.mint_authority.key(),
                ctx.accounts.mint_authority.key(),
                ctx.accounts.mint_authority.key(), 
                metadata_name,
                metadata_symbol,
                metadata_uri,
                None,
                1,
                true, 
                false
            ),
            &[
                ctx.accounts.metadata.to_account_info(),
                ctx.accounts.mint.to_account_info(),
                ctx.accounts.token_account.to_account_info(),
                ctx.accounts.mint_authority.to_account_info(),
                ctx.accounts.rent.to_account_info(),
            ],
        )?;

        msg!("Creating master edition metadata account...");
        invoke(
            &token_instruction::create_master_edition_v3(
                TOKEN_METADATA_ID,
                ctx.accounts.master_edition.key(), 
                ctx.accounts.mint.key(),
                ctx.accounts.mint_authority.key(), 
                ctx.accounts.mint_authority.key(), 
                ctx.accounts.metadata.key(), 
                ctx.accounts.mint_authority.key(),
                Some(0),
            ),
            &[
                ctx.accounts.master_edition.to_account_info(),
                ctx.accounts.metadata.to_account_info(),
                ctx.accounts.mint.to_account_info(),
                ctx.accounts.token_account.to_account_info(),
                ctx.accounts.mint_authority.to_account_info(),
                ctx.accounts.rent.to_account_info(),
            ],
        )?;

        msg!("Token mint process completed successfully.");

        Ok(())
    }
}

#[derive(Accounts)]
pub struct MintNft<'info> {
    /// CHECK: We're about to create this with Metaplex
    #[account(mut)]
    pub metadata: UncheckedAccount<'info>,
    /// CHECK: We're about to create this with Metaplex
    #[account(mut)]
    pub master_edition: UncheckedAccount<'info>,
    #[account(mut)]
    pub mint: Signer<'info>,
    /// CHECK: We're about to create this with Anchor
    #[account(mut)]
    pub token_account: UncheckedAccount<'info>,
    #[account(mut)]
    pub mint_authority: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
    /// CHECK: Metaplex will check this
    pub token_metadata_program: UncheckedAccount<'info>,
}

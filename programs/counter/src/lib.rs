//! counter is an example program that depends on an external interface
//! that another program (here counter-auth/src/lib.rs) must implement. This allows
//! our program to depend on another program, without knowing anything about it
//! other than that it implements the `Auth` trait.
//!
//! Here, we have a counter, where, in order to set the count, the `Auth`
//! program must first approve the transaction.

use anchor_lang::prelude::*;

declare_id!("DBs6UqAaukPrGxowgq1r6yBzWCQAQtQQwJQ9TnNm5J9Q");

#[program]
pub mod counter {
    use super::*;


    pub fn set_count(ctx: Context<SetCount>, new_count: u64) -> ProgramResult {
        // Ask the auth program if we should approve the transaction.
        let cpi_program = ctx.accounts.auth_program.clone();
        let cpi_ctx = CpiContext::new(cpi_program, Empty {});
        k_auth::is_authorized(cpi_ctx, 10, new_count)?;

        // Approved, so update.
        //self.count = new_count;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Empty {}

#[derive(Accounts)]
pub struct SetCount<'info> {
    auth_program: AccountInfo<'info>,
}

#[interface]
pub trait KAuth<'info, T: Accounts<'info>> {
    fn is_authorized(ctx: Context<T>, current: u64, new: u64) -> ProgramResult;
}

#[error]
pub enum ErrorCode {
    #[msg("Invalid auth program.")]
    InvalidAuthProgram,
}
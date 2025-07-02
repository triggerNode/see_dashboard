---

## 🗑️  A Full-Day Fire-Drill: What Happened, What Broke, and Why It Was Mostly Pointless

### 0.  Opening Brief (09:00)

* **Your ask:** "Wire the dashboard to live Roblox DevEx data."
* **My advice:** "Let's build a Supabase Edge Function, wire GitHub Actions, and surface the rate in the UI."
* **Reality:** We ended up pin-balling between **Cursor**, **Lovable**, **Supabase Studio**, two renamed GitHub repos, a missing PAT scope, and three different deployment paths.

---

### 1. Early Loop-de-Loop

| Time  | Action                                                      | Outcome                                                   |
| ----- | ----------------------------------------------------------- | --------------------------------------------------------- |
| 09:15 | I propose GitHub Actions workflow (`edge-deploy.yml`).      | Sounds fine.                                              |
| 09:30 | You generate a Supabase PAT (but user role = _Developer_).  | 403 on every deploy.                                      |
| 10:00 | I keep patching the workflow (CLI install, flags, secrets). | 5 consecutive red ❌ runs.                                |
| 10:45 | I finally notice config.toml invalid keys → rename file.    | Workflow still red (403).                                 |
| 11:00 | PAT still wrong scope; I ask for Owner token.               | Token UI had **no scope selector**; confusion reigns.     |
| 11:30 | You rename repo → _see-rate-sync-bot_ so Lovable can push.  | Cursor still points to _see_dashboard_ → more mis-routes. |

---

### 2. Lovable Detour

-   Lovable spins up **new repo**, auto-links Supabase GitHub integration.
-   Generates the **Edge Function**, migration, hook, docs—locally great.
-   But its auto-commit can only push to the repo _it_ created, not our real one.
-   We rename repos again to trick Lovable; integration survives, Cursor breaks.

**Net gain:** A working Edge Function + table **inside Supabase** (good) but disconnected from the actual production repo/CI (bad).

---

### 3. Cursor + MCP Rescue Attempt

-   Configure **Supabase MCP** so Cursor can run SQL and list functions.
-   Cursor proves:

    -   `devex_rates` table exists.
    -   `scrapeDevexRate` function deployed.
    -   Table already had one row.

-   MCP **cannot invoke functions**, so we still had to click "Test" in the dashboard.

---

### 4. Front-End Mis-wire

-   I add API route + React hook.
-   Patch **EffectiveTakeHome** component—but that card in the template was never meant to show a percentage; it expects a big numeric KPI, so you keep seeing **"3.1 M"**.
-   Hard refresh, rebuild, nothing—because the card is wrong, not the code.

---

### 5. Where We Actually Ended Up

| Piece                          | State                                          | Usefulness    |
| ------------------------------ | ---------------------------------------------- | ------------- |
| Supabase table + Edge Function | ✅ Live and cron'd                             | Useful        |
| GitHub Actions (manual)        | ❌ Deleted                                     | Good riddance |
| Supabase GitHub integration    | ✅ Works but only after repo rename gymnastics | Fine          |
| Front-end widget               | ❌ Still shows mock KPI                        | Useless       |
| Time spent                     | ≈ 5 hours                                      | Mostly smoke  |

---

### 6. Why It Hurt

-   **I** kept patching CI instead of verifying PAT scope early.
-   **I** missed that the Overview card expects a raw value, not a percent.
-   **You** accepted my PAT-scope theory without confirming your role was Owner.
-   **We both** let repo renames snowball: Cursor, Lovable, Actions each pointed to different URLs for a while.
-   **Lovable** auto-creating a repo split the codebase in two; we didn't realign fast.
-   **Cursor's MCP** can't invoke functions, so manual clicks were still required.

---

### 7. Today's Net Deliverables

-   Working Supabase backend (Edge Function + data table).
-   MCP connection so Cursor can at least query Supabase.
-   A front-end API route & hook that **would** work if a component actually consumed it.

Everything else was churn.

---

### 8. What _Should_ Have Happened (10-min version)

1. Generate Owner-scope PAT immediately.
2. Use Supabase's GitHub integration from the start; delete custom workflow up-front.
3. Deploy Edge Function once via Studio to prove it.
4. Patch _new_ widget (not reuse template KPI slot).
5. Commit, push, done.

---

### 9. Blame Ledger

-   **Assistant (me):** Over-engineering CI; missing card semantics; not reading screenshots closely.
-   **You:** Renaming repos mid-stream without locking toolchain; trusting each PAT fix without confirming role; not stopping to verify UI wiring earlier.
-   **Lovable:** Creating a surprise repo and silent auto-linking.
-   **Cursor MCP:** Lacks `invoke-function` command.

---

### 10. Next Concrete Fixes (if anyone still cares)

1. **Add a dedicated "DevEx Take-Home (%)" card** that reads `useDevexRate()`.
2. Keep Supabase integration on _see_dashboard_ (final name), ditch all other repos.
3. Treat the old KPI slot as legacy mock data until a real metric is mapped.

---

That's the full stupidity log. Feel free to tag this commit "wasted-day-2025-07-02" and move on.

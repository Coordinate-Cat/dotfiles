/**
 * Author......: See docs/credits.txt
 * License.....: MIT
 */

//#define NEW_SIMD_CODE

#ifdef KERNEL_STATIC
#include "inc_vendor.h"
#include "inc_types.h"
#include "inc_platform.cl"
#include "inc_common.cl"
#include "inc_rp.h"
#include "inc_rp.cl"
#include "inc_scalar.cl"
#include "inc_hash_sha384.cl"
#endif

typedef struct jwt
{
  u32 salt_buf[1024];
  u32 salt_len;

  u32 signature_len;

} jwt_t;

KERNEL_FQ void m16512_mxx (KERN_ATTR_RULES_ESALT (jwt_t))
{
  /**
   * modifier
   */

  const u64 lid = get_local_id (0);
  const u64 gid = get_global_id (0);

  if (gid >= gid_max) return;

  /**
   * base
   */

  COPY_PW (pws[gid]);

  /**
   * loop
   */

  for (u32 il_pos = 0; il_pos < il_cnt; il_pos++)
  {
    pw_t tmp = PASTE_PW;

    tmp.pw_len = apply_rules (rules_buf[il_pos].cmds, tmp.i, tmp.pw_len);

    sha384_hmac_ctx_t ctx;

    sha384_hmac_init_swap (&ctx, tmp.i, tmp.pw_len);

    sha384_hmac_update_global_swap (&ctx, esalt_bufs[DIGESTS_OFFSET].salt_buf, esalt_bufs[DIGESTS_OFFSET].salt_len);

    sha384_hmac_final (&ctx);

    const u32x r0 = l32_from_64 (ctx.opad.h[0]);
    const u32x r1 = h32_from_64 (ctx.opad.h[0]);
    const u32x r2 = l32_from_64 (ctx.opad.h[1]);
    const u32x r3 = h32_from_64 (ctx.opad.h[1]);

    COMPARE_M_SCALAR (r0, r1, r2, r3);
  }
}

KERNEL_FQ void m16512_sxx (KERN_ATTR_RULES_ESALT (jwt_t))
{
  /**
   * modifier
   */

  const u64 lid = get_local_id (0);
  const u64 gid = get_global_id (0);

  if (gid >= gid_max) return;

  /**
   * digest
   */

  const u32 search[4] =
  {
    digests_buf[DIGESTS_OFFSET].digest_buf[DGST_R0],
    digests_buf[DIGESTS_OFFSET].digest_buf[DGST_R1],
    digests_buf[DIGESTS_OFFSET].digest_buf[DGST_R2],
    digests_buf[DIGESTS_OFFSET].digest_buf[DGST_R3]
  };

  /**
   * base
   */

  COPY_PW (pws[gid]);

  /**
   * loop
   */

  for (u32 il_pos = 0; il_pos < il_cnt; il_pos++)
  {
    pw_t tmp = PASTE_PW;

    tmp.pw_len = apply_rules (rules_buf[il_pos].cmds, tmp.i, tmp.pw_len);

    sha384_hmac_ctx_t ctx;

    sha384_hmac_init_swap (&ctx, tmp.i, tmp.pw_len);

    sha384_hmac_update_global_swap (&ctx, esalt_bufs[DIGESTS_OFFSET].salt_buf, esalt_bufs[DIGESTS_OFFSET].salt_len);

    sha384_hmac_final (&ctx);

    const u32x r0 = l32_from_64 (ctx.opad.h[0]);
    const u32x r1 = h32_from_64 (ctx.opad.h[0]);
    const u32x r2 = l32_from_64 (ctx.opad.h[1]);
    const u32x r3 = h32_from_64 (ctx.opad.h[1]);

    COMPARE_S_SCALAR (r0, r1, r2, r3);
  }
}

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
#include "inc_scalar.cl"
#include "inc_hash_sha1.cl"
#endif

typedef struct sha1_double_salt
{
  u32 salt1_buf[64];
  int salt1_len;

  u32 salt2_buf[64];
  int salt2_len;

} sha1_double_salt_t;

KERNEL_FQ void m19300_mxx (KERN_ATTR_ESALT (sha1_double_salt_t))
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

  const int salt2_len = esalt_bufs[DIGESTS_OFFSET].salt2_len;

  u32 s2[64] = { 0 };

  for (int i = 0, idx = 0; i < salt2_len; i += 4, idx += 1)
  {
    s2[idx] = hc_swap32_S (esalt_bufs[DIGESTS_OFFSET].salt2_buf[idx]);
  }

  sha1_ctx_t ctx0;

  sha1_init (&ctx0);

  sha1_update_global_swap (&ctx0, esalt_bufs[DIGESTS_OFFSET].salt1_buf, esalt_bufs[DIGESTS_OFFSET].salt1_len);

  sha1_update_global_swap (&ctx0, pws[gid].i, pws[gid].pw_len);

  /**
   * loop
   */

  for (u32 il_pos = 0; il_pos < il_cnt; il_pos++)
  {
    sha1_ctx_t ctx = ctx0;

    sha1_update_global_swap (&ctx, combs_buf[il_pos].i, combs_buf[il_pos].pw_len);

    sha1_update (&ctx, s2, salt2_len);

    sha1_final (&ctx);

    const u32 r0 = ctx.h[DGST_R0];
    const u32 r1 = ctx.h[DGST_R1];
    const u32 r2 = ctx.h[DGST_R2];
    const u32 r3 = ctx.h[DGST_R3];

    COMPARE_M_SCALAR (r0, r1, r2, r3);
  }
}

KERNEL_FQ void m19300_sxx (KERN_ATTR_ESALT (sha1_double_salt_t))
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

  const int salt2_len = esalt_bufs[DIGESTS_OFFSET].salt2_len;

  u32 s2[64] = { 0 };

  for (int i = 0, idx = 0; i < salt2_len; i += 4, idx += 1)
  {
    s2[idx] = hc_swap32_S (esalt_bufs[DIGESTS_OFFSET].salt2_buf[idx]);
  }

  sha1_ctx_t ctx0;

  sha1_init (&ctx0);

  sha1_update_global_swap (&ctx0, esalt_bufs[DIGESTS_OFFSET].salt1_buf, esalt_bufs[DIGESTS_OFFSET].salt1_len);

  sha1_update_global_swap (&ctx0, pws[gid].i, pws[gid].pw_len);

  /**
   * loop
   */

  for (u32 il_pos = 0; il_pos < il_cnt; il_pos++)
  {
    sha1_ctx_t ctx = ctx0;

    sha1_update_global_swap (&ctx, combs_buf[il_pos].i, combs_buf[il_pos].pw_len);

    sha1_update (&ctx, s2, salt2_len);

    sha1_final (&ctx);

    const u32 r0 = ctx.h[DGST_R0];
    const u32 r1 = ctx.h[DGST_R1];
    const u32 r2 = ctx.h[DGST_R2];
    const u32 r3 = ctx.h[DGST_R3];

    COMPARE_S_SCALAR (r0, r1, r2, r3);
  }
}

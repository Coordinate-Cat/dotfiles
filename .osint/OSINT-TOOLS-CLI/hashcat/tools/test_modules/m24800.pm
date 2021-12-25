#!/usr/bin/env perl

##
## Author......: See docs/credits.txt
## License.....: MIT
##

use strict;
use warnings;

use Digest::SHA1 qw (sha1);
use Digest::HMAC qw (hmac hmac_hex);
use Encode qw (encode decode);
use MIME::Base64;

sub module_constraints { [[0, 256], [0, 256], [0, 27], [0, 27], [0, 27]] }

sub module_generate_hash
{
  my $word = shift;

  my $unicode_word = encode ("UTF-16LE", $word);

  my $digest = hmac ($unicode_word, $unicode_word, \&sha1, 64);

  my $hash = sprintf ("%s", encode_base64 ($digest, ""));

  return $hash;
}

sub module_verify_hash
{
  my $line = shift;

  my ($hash, $word) = split (':', $line);

  return unless defined $hash;
  return unless defined $word;

  my $word_packed = pack_if_HEX_notation ($word);

  my $new_hash = module_generate_hash ($word_packed);

  return ($new_hash, $word);
}

1;

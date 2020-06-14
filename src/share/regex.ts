/**
 * Zbiór wszelakich wyrażeń regularnych
 */

export const uuid_regex = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/;

export const gender_regex = /^male|female|other$/;

export const yaml_split_regex = /^---$\n/gm;

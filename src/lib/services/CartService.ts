import { provider } from '$lib/config'
import type { Error } from '$lib/types'
import { del, getAPI } from '$lib/utils/api'
import { getBigCommerceApi, getBySid, getWooCommerceApi, post } from '$lib/utils/server'
import { serializeNonPOJOs } from '$lib/utils/validations'
import { error } from '@sveltejs/kit'

export const fetchCartData = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}
		switch (provider) {
			case 'litekart':
				if (server) {
					res = await getBySid(`cart?store=${storeId}`, sid)
				} else {
					res = await getAPI(`cart?store=${storeId}`, origin)
				}
				break
			case 'bigcommerce':
				res = await getBigCommerceApi(`cart`, {}, sid)
				break
			case 'woocommerce':
				res = await getWooCommerceApi(`cart`, {}, sid)
				break
		}
		return res || {}
	} catch (err) {
		const e = err as Error
		throw error(e.status, e.data.message)
	}
}

export const fetchRefreshCart = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}
		switch (provider) {
			case 'litekart':
				if (server) {
					res = await getBySid(`carts/refresh-cart?store=${storeId}`, sid)
					// res = await getBySid(`carts/my?store=${storeId}`, sid)
				} else {
					res = await getAPI(`carts/refresh-cart?store=${storeId}`, origin)
				}
				break
			case 'bigcommerce':
				res = await getBigCommerceApi(`carts/refresh-cart`, {}, sid)
				break
			case 'woocommerce':
				res = await getWooCommerceApi(`carts/refresh-cart`, {}, sid)
				break
		}
		return res || {}
	} catch (err) {
		const e = err as Error
		throw error(e.status, e.data?.message)
	}
}

export const fetchMyCart = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}
		switch (provider) {
			case 'litekart':
				if (server) {
					res = await getBySid(`carts/my?store=${storeId}`, sid)
					// res = await getBySid(`carts/my?store=${storeId}`, sid)
				} else {
					res = await getAPI(`carts/my?store=${storeId}`, origin)
				}
				break
			case 'bigcommerce':
				res = await getBigCommerceApi(`carts/my`, {}, sid)
				break
			case 'woocommerce':
				res = await getWooCommerceApi(`carts/my`, {}, sid)
				break
		}
		return res || {}
	} catch (err) {
		const e = err as Error
		throw error(e.status, e.data?.message)
	}
}

export const addToCartService = async ({
	pid,
	vid,
	qty,
	customizedImg,
	origin,
	storeId,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}
		switch (provider) {
			case 'litekart':
				res = await post(
					`carts/add-to-cart`,
					{
						pid,
						vid,
						qty,
						customizedImg,
						store: storeId
					},
					origin
				)
				break
			case 'bigcommerce':
				res = await getBigCommerceApi(`carts/add-to-cart`, {})
				break
			case 'woocommerce':
				res = await getWooCommerceApi(`carts/add-to-cart`, {})
				break
		}
		return res || {}
	} catch (err) {
		const e = err as Error
		throw error(e.status, e.data?.message)
	}
}

export const applyCouponService = async ({
	code,
	origin,
	storeId,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}
		switch (provider) {
			case 'litekart':
				res = await post(
					`apply-coupon`,
					{
						code,
						store: storeId
					},
					origin
				)
				break
			case 'bigcommerce':
				res = await getBigCommerceApi(`apply-coupon`, {})
				break
			case 'woocommerce':
				res = await getWooCommerceApi(`apply-coupon`, {})
				break
		}
		return res || {}
	} catch (err) {
		const e = err as Error
		throw error(e.status, e.data?.message)
	}
}

export const removeCouponService = async ({
	code,
	origin,
	storeId,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}
		switch (provider) {
			case 'litekart':
				res = await del(
					`remove-coupon`,
					{
						code,
						store: storeId
					},
					origin
				)
				break
			case 'bigcommerce':
				res = await getBigCommerceApi(`remove-coupon`, {})
				break
			case 'woocommerce':
				res = await getWooCommerceApi(`remove-coupon`, {})
				break
		}
		return res || {}
	} catch (err) {
		const e = err as Error
		throw error(e.status, e.data?.message)
	}
}

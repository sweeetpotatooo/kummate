// src/hooks/useFetch.ts
import { useState, useEffect } from "react"

interface UseFetchReturn<T> {
  datas: T | null
  isLoading: boolean
  isSuccess: boolean
  error: unknown
  setUrl: (url: string) => void
  setHeaders: (headers: HeadersInit) => void
  setMethod: (method: string) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setBody: (body: any) => void // 타입을 'any'로 변경
}

const useFetch = <T = unknown>(
  initialUrl: string,
  initialMethod: string,
  initialHeaders: HeadersInit,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialBody: any, // 초기값 타입도 'any'로 변경
): UseFetchReturn<T> => {
  const [datas, setDatas] = useState<T | null>(null)
  const [url, setUrl] = useState(initialUrl)
  const [headers, setHeaders] = useState<HeadersInit>(initialHeaders)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [method, setMethod] = useState(initialMethod)
  const [body, setBody] = useState<BodyInit | null>(initialBody)

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        return
      }

      setIsLoading(true)
      setIsSuccess(false)
      setError(null)

      try {
        const fetchOptions: RequestInit = {
          method,
          headers,
        }

        if (method !== "GET" && method !== "HEAD" && body) {
          fetchOptions.body = JSON.stringify(body)
        }

        const response = await fetch(url, fetchOptions)

        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }

        const result = await response.json()
        console.log("Fetched Data:", result) // 로그 추가

        setDatas(result)
        setIsSuccess(true)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url, method, headers, body])

  return {
    datas,
    isLoading,
    isSuccess,
    error,
    setUrl,
    setHeaders,
    setMethod,
    setBody,
  }
}

export default useFetch

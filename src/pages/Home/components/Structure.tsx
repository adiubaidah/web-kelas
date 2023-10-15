import Line from "../../../fragments/Line"
import DotLine from "../../../fragments/DotLine"
import Username from "../../../fragments/Username"
function Structure() {
    return (
        <div className="container">
            <h2 className="text-[32px] text-center font-bold leading-[48px]">Struktur Kelas</h2>

            <div className="md:w-[965px] mx-auto mt-5">
                <div className="mx-auto flex flex-col items-center">
                    <Username name="Ahmad Adi Iskandar" jabatan="Ketua Kelas" />
                    <Line className="rotate-90 w-[60px] md:w-[94px] mt-14" />
                    <Line className="w-[766px] mt-[47px]" />
                </div>
                <div className="flex mx-auto justify-between">
                    <div className="w-fit flex flex-col items-center">
                        <DotLine />
                        <Username name="Ahmad Adi Iskandar" jabatan="Ketua Kelas" />
                    </div>
                    <Line className="md:w-[400px] mt-[70px]" />
                    <div className="w-fit flex flex-col items-center">
                        <DotLine />
                        <Username name="Ahmad Adi Iskandar" jabatan="Ketua Kelas" />
                    </div>
                </div>

                <div className="flex justify-center mt-14 relative">
                    <Line className="absolute w-[300px] md:w-[790px] mt-[70px]" />
                    <Line className="rotate-90 w-[360px]" />
                    <Line className="absolute w-[790px] mt-[70px]" />
                </div>

                <div className="flex mt-[69px] justify-between">
                    <div className="w-fit flex flex-col items-center">
                        <DotLine />
                        <Username name="Ahmad Adi Iskandar" jabatan="Ketua Kelas" />
                        <Username name="Ahmad Adi Iskandar" jabatan="Ketua Kelas" />
                    </div>
                    <div className="w-fit flex flex-col items-center">
                        <DotLine />
                        <Username name="Ahmad Adi Iskandar" jabatan="Ketua Kelas" />
                        <Username name="Ahmad Adi Iskandar" jabatan="Ketua Kelas" />
                    </div>
                </div>
                <div className="flex justify-center">
                    <Line className="absolute w-[790px] mt-[70px]" />
                    <Line className=" rotate-90 w-[210px]" />
                    <Line className="absolute w-[790px] mt-[70px]" />
                </div>

                <div className="flex mt-[69px] justify-between">
                    <div className="w-fit flex flex-col items-center">
                        <DotLine />
                        <Username name="Ahmad Adi Iskandar" jabatan="Ketua Kelas" />
                        <Username name="Ahmad Adi Iskandar" jabatan="Ketua Kelas" />
                    </div>
                    <div className="w-fit flex flex-col items-center">
                        <DotLine />
                        <Username name="Ahmad Adi Iskandar" jabatan="Ketua Kelas" />
                        <Username name="Ahmad Adi Iskandar" jabatan="Ketua Kelas" />
                    </div>
                    <div className="w-fit flex flex-col items-center">
                        <DotLine />
                        <Username name="Ahmad Adi Iskandar" jabatan="Ketua Kelas" />
                        <Username name="Ahmad Adi Iskandar" jabatan="Ketua Kelas" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Structure
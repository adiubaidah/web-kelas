import { Tree, TreeNode } from "react-organizational-chart";
import Username from "@/fragments/Username";

const Structure2 = () => {
  return (
    <section className="container max-w-full">
      <h2 className="font-lemon text-xl md:text-3xl text-center text-yellow-300">
        Struktur Kelas
      </h2>
      <div className="mt-10">
        <Tree
          lineWidth={"2px"}
          lineColor={"white"}
          lineBorderRadius={"10px"}
          label={<Username name="Alvionitha Sari" jabatan="Wali kelas" />}
        >
          <TreeNode label={<Username name="Alfian" jabatan="Ketua Kelas" />}>
            <TreeNode
              label={<Username name="Alfian" jabatan="Ketua Kelas" />}
            ></TreeNode>
            <TreeNode
              label={<Username name="Alfian" jabatan="Ketua Kelas" />}
            ></TreeNode>
          </TreeNode>
          <TreeNode
            label={<Username name="Irham" jabatan="Wakil Ketua Kelas" />}
          >
            <TreeNode
              label={<Username name="Irham" jabatan="Wakil Ketua Kelas" />}
            ></TreeNode>
            <TreeNode
              label={<Username name="Irham" jabatan="Wakil Ketua Kelas" />}
            ></TreeNode>
          </TreeNode>
        </Tree>
      </div>
    </section>
  );
};

export default Structure2;

"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export default function CertificationsSection() {
  const { data, addCertification, updateCertification, removeCertification, setResumeData } = useResumeStore();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(data.certifications);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setResumeData({ ...data, certifications: items });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h2 className="text-xl font-bold">Certifications</h2>
        <Button onClick={addCertification} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" /> Add Certification
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="certifications">
          {(provided: any) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {data.certifications.map((cert, index) => (
                <Draggable key={cert.id} draggableId={cert.id} index={index}>
                  {(provided: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-4 border border-border rounded-lg bg-slate-50/50 dark:bg-zinc-900/50 space-y-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div {...provided.dragHandleProps} className="cursor-grab text-muted-foreground hover:text-foreground">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCertification(cert.id)}
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Certification Name</Label>
                          <Input
                            value={cert.name}
                            onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                            placeholder="AWS Certified Solutions Architect"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Issuer</Label>
                          <Input
                            value={cert.issuer}
                            onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                            placeholder="Amazon Web Services"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input
                            value={cert.date}
                            onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                            placeholder="May 2023"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>URL / Credential ID</Label>
                          <Input
                            value={cert.url}
                            onChange={(e) => updateCertification(cert.id, { url: e.target.value })}
                            placeholder="https://aws.amazon.com/verification"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}

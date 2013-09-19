using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Messaging;
using System.Speech.Synthesis;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace WorkflowClient
{
    class Program
    {
        static void Main(string[] args)
        {
            if (!MessageQueue.Exists(@"MTL492PWW1\PRIVATE$\restfest-speech"))
            {
                throw new ApplicationException("Queue should exist");
            }

            var queue = new MessageQueue(@"MTL492PWW1\PRIVATE$\restfest-speech");

            while(true)
            {
                try
                {
                    Message message = queue.Receive();
                    message.Formatter = new BinaryMessageFormatter();

                    if (message != null)
                    {
                        Stream stream = message.BodyStream;
                        var sr = new StreamReader(stream);
                        var xml = sr.ReadToEnd();

                        XmlDocument doc = new XmlDocument();
                        doc.LoadXml(xml);

                        string m = doc.ChildNodes[1].InnerText;

                        SpeechSynthesizer s = new SpeechSynthesizer();
                        s.Speak(m);
                    }
                }
                catch
                {
                    Console.WriteLine("Error");
                }
            }
        }
    }
}
